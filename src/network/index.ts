import axios, {AxiosRequestConfig, AxiosRequestHeaders, AxiosError, AxiosResponse} from 'axios'
import { keychainData } from '../redux/localStorage/localStorage'
import { errorHandler, exceptionHandler, hideLoader, showLoader } from '../redux/slices/uiSlice';
import { removeUserData } from '../redux/slices/userslice';
import { appConstants } from '../utils/constants/appConstants'
import { isNotEmptyText, objToFormData } from '../utils/globalFunctions';
import { API_HEADERS, API_REQUEST, ApiResponse } from './collection'
import Config from 'react-native-config';

const TIMEOUT_DURATION__IN_MILLIS = 60000;

const defaultInstance = axios.create({
    baseURL : Config.BASE_URL,
    timeout : TIMEOUT_DURATION__IN_MILLIS,
    validateStatus: function(status){
        return status >=200 && status < 500
    }
});

defaultInstance.interceptors.request.use(
    async(config : AxiosRequestConfig) : Promise<AxiosRequestConfig> => {
        console.log('Pre API Request Config', config);
        if(config.data){
            if(config.data instanceof FormData){
                if(config.headers !== undefined) {
                    config.headers[API_HEADERS.CONTENT_TYPE] = API_HEADERS.TYPE_FORM_DATA;
                }
            } else { 
                if(config.headers !== undefined) {
                    config.headers[API_HEADERS.CONTENT_TYPE] = API_HEADERS.TYPE_RAW_DATA
                }
            }   
        } 
        // if(storageInstance.contains(appConstants.token_data)) {
        //     const accessToken: string = storageInstance?.getString(appConstants.token_data)!;
        //     if(accessToken) {
        //         const parsedAccessToken = JSON.parse(accessToken);
        //         if(config.headers !== undefined) {
        //             config.headers[API_HEADERS.AUTHORIZATION] = `${API_HEADERS.TOKEN_TYPE} ${parsedAccessToken.access}`
        //         }
        //     }            
        // }
         let token =  await keychainData.getUserToken()
         if(token) {
            const accessToken: string = token;
            if(accessToken) {
                if(config.headers !== undefined) {
                    config.headers[API_HEADERS.AUTHORIZATION] = `${accessToken}`
                }
            }            
        }

        console.log("Post API Request Config:", config);
		console.log("Post API Request Config Stringified:", JSON.stringify(config));
        return config;
    },
    (error: any) => {
        console.log("Request Error:",error)
        return Promise.reject(error)
    }
)

defaultInstance.interceptors.response.use(
    (response: AxiosResponse<any, any>) => {
        console.log("API Response", response.data)
		console.log("API Response Stringfied ", JSON.stringify(response.data))

        let data : ApiResponse<any> = response.data || {}
        data.status = {
            code : response?.data?.status?.code,
            message : response?.data?.status?.message
        }
        return data
    },
    (error: AxiosError) => {
        console.log("Response Error:", error.toJSON());
        return Promise.reject(error);
    }
)

export const commonApiWrapper = (
    dispatch: Function,
    url: string,
    apiRequestType: string,
    contentType: string,
    path: string | null,
    requestData: any,
    params: any,
    successCallback: Function,
    errorCallback: Function,
    hideLoader?: boolean
) => {
    console.log('ENTERED CAR : ')
    showLoaderHandle(hideLoader ? false : true, dispatch);
    if(isNotEmptyText(path)){
        url = `${url}${path}/`
    }
    prepareApiRequest(
        url,
        apiRequestType,
        contentType,
        params,
        requestData,
        (response: ApiResponse<any>) => handleSuccess(response, successCallback, dispatch),
        (errorMessage: string) => handleError(errorMessage, errorCallback, dispatch),
        (exception: any) => handleException(exception, dispatch),
        (shouldRefresh: boolean) => handleAuthFailed(shouldRefresh, dispatch)
    )
}

const prepareApiRequest = (
    url: string,
    apiRequestType: string,
    contentType: string,
    params: any,
    body: any,
    successCallback: Function,
    errorCallback: Function,
    exceptionCallback: Function,
    authenticationFailedCallback: Function
) => {
    requestApi(
        url,
        apiRequestType,
        params,
        getRequestData(body, contentType),
        successCallback,
        errorCallback,
        exceptionCallback,
        authenticationFailedCallback
    )
}

const requestApi = (
    url: string,
    apiRequestType: string,
    params: any,
    data: any,
    successCallback: Function,
    errorCallback: Function,
    exceptionCallback: Function,
    authenticationFailedCallback: Function
) => {

    let promise: Promise<any> | null = null;
    switch (apiRequestType){
        case API_REQUEST.GET:
            console.log("GET");
            promise = defaultInstance.get(url,{params: params})
            break;
        case API_REQUEST.POST:
            console.log("POST");
            promise = defaultInstance.post(url, data, {params: params})
            break;
        case API_REQUEST.PATCH:
            console.log("PATCH");
            promise = defaultInstance.patch(url, data, {params: params})
            break;
        case API_REQUEST.PUT:
            console.log("PUT");
            promise = defaultInstance.put(url, data, {params: params})
            break;
        case API_REQUEST.DELETE:
            console.log("DELETE");
            promise = defaultInstance.delete(url, data || params ? {data: data, params: params}: {});
            break;
    }

    promise!!
        .then((response: ApiResponse<any>)=> {
            console.log("Final Response", response)
			console.log("Stringified Final Response", JSON.stringify(response))

            if(response.status)
            {
                if(response.status.code >= 200 && response.status.code <=299){
                    // SUCCESS
                    successCallback?.(response)
                }else if(response.status.code === 401){
                    // Authentication Error
                    authenticationFailedCallback?.(false)
                    errorCallback?.(response.status.message, response.errors);
                }else {
                    // All the other errors
                    errorCallback?.(response.status.message);
                }
            }else{
                exceptionCallback?.(response)
            }
        }).catch((ex: any)=> {
            exceptionCallback?.(ex)
        })
}

// HELPER FUNCTIONS
const getRequestData = (data: any, contentType: String) => {
    switch(contentType) {
        case API_HEADERS.TYPE_RAW_DATA:
            return data;
        case API_HEADERS.TYPE_MULTIPART_DATA:
        case API_HEADERS.TYPE_FORM_DATA:
            return objToFormData(data);
    }
    return data;
}
const showLoaderHandle = (shouldShow: boolean, dispatch: Function) => {
    console.log('showLoaderHandle VALUES: ', shouldShow);
  if (shouldShow) {
    dispatch(showLoader());
  } else {
    dispatch(hideLoader());
  }
}
const handleAuthFailed = async(shouldRefresh: boolean, dispatch: Function) => {
    if (!shouldRefresh) {
    // storageInstance.clearAll(), 
    await keychainData.clearData()
    dispatch(removeUserData());
    dispatch(hideLoader());
  } else {
    dispatch(hideLoader());
  }
}
const handleSuccess = (response: ApiResponse<any>, successCallback: Function, dispatch: Function) => {
    console.log(JSON.stringify(response));
  dispatch(hideLoader());
  successCallback?.(response);
}
const handleError = (errorMessage: string, errorCallback: Function, dispatch: Function)=>{
    if (errorCallback) {
        dispatch(hideLoader());
      errorCallback?.(errorMessage);
    } else {
      dispatch(errorHandler(errorMessage));
    }
}
const handleException = (exception: string, dispatch: Function)=>{
    if (isNotEmptyText(exception)) {
    console.log('EXCEPTION: ' + exception);
    dispatch(exceptionHandler(JSON.stringify(exception)));
  } else {
    dispatch(hideLoader());
  }
}

