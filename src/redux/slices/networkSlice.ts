import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICECONSTANT } from "../../utils/constants/sliceConstants";

export enum NETWORK {
    GANACHE=0,
    MAIN_NET,
    GOERLI_NET
}

export type reducer_network = {
    network : NETWORK
}

const initialState : reducer_network = {
    network : NETWORK.MAIN_NET
}

const networkSlice=  createSlice({
    name : SLICECONSTANT.NETWORK_SLICE,
    initialState,
    reducers:{
        updateNetwork: (state,action: PayloadAction<NETWORK>) => {
            console.log("Update NETWORK 1:",action.payload);
            state.network = action.payload;
            console.log("Update NETWORK 2:",action.payload);   
        }
    }
})

export const {updateNetwork} = networkSlice.actions;
export default networkSlice.reducer;