import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICECONSTANT } from "../../utils/constants/sliceConstants";


export type user = {
    privatekeys:string[]
    username:string,
    password:string,
}

type initState = {
    user_data : user,
}

const initialState : initState = {
    user_data : {
        privatekeys :[],
        password :"",
        username :"",
    }
}

const userSlice = createSlice({
    name: SLICECONSTANT.USER_SLICE,
    initialState,
    reducers:{
        setUserData: (state,action: PayloadAction<user>) => {
            state.user_data = action.payload
        },
        updateUserData: (state, action: PayloadAction<user>) => {
            let data : user = Object.assign({}, state.user_data, action.payload);
            state.user_data = data;
        },
        removeUserData:(state) => {
            state.user_data = {
                username :"",
                password :"",
                privatekeys :[]
            }
        },
        addUserAccount:(state,action: PayloadAction<string>) => {
            state.user_data.privatekeys.push(action.payload)
        }
    }
})

export const {setUserData,updateUserData,removeUserData,addUserAccount} = userSlice.actions;
export default userSlice.reducer

