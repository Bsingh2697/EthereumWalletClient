import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICECONSTANT } from "../../utils/constants/sliceConstants";


export type reducer_user = {
    address:string
    username:string,
    password:string,
    user_id:string,
}

type initState = {
    user_data : reducer_user,
    token:string
}

const initialState : initState = {
    user_data : {
        address:"",
        password :"",
        username :"",
        user_id:"",
    },
    token:""

}

const userSlice = createSlice({
    name: SLICECONSTANT.USER_SLICE,
    initialState,
    reducers:{
        setUserData: (state,action: PayloadAction<reducer_user>) => {
            state.user_data = action.payload
        },
        updateUserData: (state, action: PayloadAction<reducer_user>) => {
            let data : reducer_user = Object.assign({}, state.user_data, action.payload);
            state.user_data = data;
        },
        setTokenData: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        updateTokenData: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        removeUserData:(state) => {
            state.user_data = {
                username :"",
                password :"",
                address:"",
                user_id:""
            },
            state.token = ""
        },
        // addUserAccount:(state,action: PayloadAction<string>) => {
        //     state.user_data.privatekeys.push(action.payload)
        // }
    }
})

export const {setUserData,updateUserData,setTokenData,updateTokenData,removeUserData} = userSlice.actions;
export default userSlice.reducer

