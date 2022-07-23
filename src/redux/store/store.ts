import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userSlice  from '../slices/userslice';

export const store = configureStore({
    reducer:{
        user : userSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
    enhancers : []
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch