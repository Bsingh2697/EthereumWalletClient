import axios from "axios"
import Config from "react-native-config"
import { API_REQUEST } from "../../network/collection"
import { etherScanNetwork } from "../constants/escanNetwork"


export interface escanParam {
    module:string,
    action:string,
    address?:string,
    tag?:string,
    startblock?:number,
    endblock?:number,
    sort?:string,
    page?:number,
    offset?:number,
    timestamp?:number,
    closest?:string,
}

const escanAxiosRequest = (method:API_REQUEST,params:escanParam,successCallback:Function,errorCallback:Function) => {
    axios({
        method: method,
        baseURL : `${etherScanNetwork.base_url()}`,
        params:{...params,apikey:Config.ETHERSCAN_KEY}
    }).then(response => {
        successCallback(response)
    }).catch(err=>{
        errorCallback(err)
    })
}

export const fetchUserHistory = (method:API_REQUEST,params:escanParam, successCallback:Function,errorCallback:Function) => {    
    console.log("FETCH USER history");
    escanAxiosRequest(method,params,successCallback,errorCallback)
}

export const fetchCurrentBlockNumber = (method:API_REQUEST,params:escanParam, successCallback:Function,errorCallback:Function) => {
    console.log("FETCH Current Block Number");
    escanAxiosRequest(method,params,successCallback,errorCallback)
}











