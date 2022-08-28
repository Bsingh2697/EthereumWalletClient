import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import networkSlice from '../slices/networkSlice';
import uiSlice from '../slices/uiSlice';
import userSlice  from '../slices/userslice';

export const store = configureStore({
    reducer:{
        user : userSlice,
        ui : uiSlice,
        network : networkSlice 
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
    enhancers : []
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch