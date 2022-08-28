import axios from "axios";

const TIMEOUT_DURATION__IN_MILLIS = 60000;

export const pinataDefaultInstance = axios.create({
    timeout : TIMEOUT_DURATION__IN_MILLIS,
    validateStatus: function(status){
        return status >=200 && status < 500
    }
});