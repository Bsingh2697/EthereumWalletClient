import { commonApiWrapper } from ".";
import { END_POINTS } from "../utils/constants/endpoints";
import { API_HEADERS, API_REQUEST, ApiResponse } from "./collection";

// Test API
export const testAPI = (successCallback:Function, errorCallback:Function) => {
        console.log('ENTERED TEST API : ')
  return (dispatch : Function) =>(
    commonApiWrapper(
      dispatch,
      END_POINTS.test,
      API_REQUEST.GET,
      API_HEADERS.TYPE_RAW_DATA,
      null,
      null,
      null,
      (res: ApiResponse<any>) => {
        // ToDo: Change it
        // dispatch(actionCreators.loginSuccess(res.data))
        successCallback(res);
      },
      errorCallback,
    ))
};

type credentials = {
  username : string,
  password : string
}

type register = credentials & {
  privateKey : string,
  address: string
}

// LOGIN USER
export const loginUser = (data:credentials,successCallback:Function, errorCallback:Function) => {
        console.log('ENTERED TEST API : ')
  return (dispatch : Function) =>(
    commonApiWrapper(
      dispatch,
      END_POINTS.login,
      API_REQUEST.POST,
      API_HEADERS.TYPE_RAW_DATA,
      null,
      data,
      null,
      (res: ApiResponse<any>) => {
        // ToDo: Change it
        // dispatch(actionCreators.loginSuccess(res.data))
        successCallback(res);
      },
      errorCallback,
    ))
};

// Sign Up
export const signUpUser = (data:register,successCallback:Function, errorCallback:Function) => {
        console.log('ENTERED TEST API Sign UP: ')
  return (dispatch : Function) =>(
    commonApiWrapper(
      dispatch,
      END_POINTS.signup,
      API_REQUEST.POST,
      API_HEADERS.TYPE_RAW_DATA,
      null,
      data,
      null,
      (res: ApiResponse<any>) => {
        // ToDo: Change it
        // dispatch(actionCreators.loginSuccess(res.data))
        successCallback(res);
      },
      errorCallback,
    ))
};


// Get Details
export const getUserDetails = (successCallback:Function, errorCallback:Function) => {
        console.log('ENTERED TEST API : ')
  return (dispatch : Function) =>(
    commonApiWrapper(
      dispatch,
      END_POINTS.userdetails,
      API_REQUEST.GET,
      API_HEADERS.TYPE_RAW_DATA,
      null,
      null,
      null,
      (res: ApiResponse<any>) => {
        // ToDo: Change it
        // dispatch(actionCreators.loginSuccess(res.data))
        successCallback(res);
      },
      errorCallback,
    ))
};

// Delete User
export const deleteUser = (data:any,successCallback:Function, errorCallback:Function) => {
        console.log('ENTERED TEST API : ')
  return (dispatch : Function) =>(
    commonApiWrapper(
      dispatch,
      END_POINTS.deleteuser,
      API_REQUEST.DELETE,
      API_HEADERS.TYPE_RAW_DATA,
      null,
      data,
      null,
      (res: ApiResponse<any>) => {
        // ToDo: Change it
        // dispatch(actionCreators.loginSuccess(res.data))
        successCallback(res);
      },
      errorCallback,
    ))
};

// Fetch User Key
export const fetchPrivateKey =(successCallback:Function, errorCallback:Function) => {
        console.log('ENTERED TEST API : ')
  return (dispatch : Function) =>(
    commonApiWrapper(
      dispatch,
      END_POINTS.key,
      API_REQUEST.GET,
      API_HEADERS.TYPE_RAW_DATA,
      null,
      null,
      null,
      (res: ApiResponse<any>) => {
        // ToDo: Change it
        // dispatch(actionCreators.loginSuccess(res.data))
        successCallback(res);
      },
      errorCallback,
    ))
};
