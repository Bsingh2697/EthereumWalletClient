import {createSlice} from '@reduxjs/toolkit';
import {SLICECONSTANT} from '../../utils/constants/sliceConstants';

type initState = {
    loader : boolean,
    message : string
}

const initialState : initState = {
  loader: false,
  message: '',
};

export const uISlice = createSlice({
  name: SLICECONSTANT.UI_SLICE,
  initialState,
  reducers: {
    showLoader: state => {
      //   console.error('SHOW LOADER');
      (state.loader = true), (state.message = '');
    },
    hideLoader: state => {
      //   console.error('HIDE LOADER');
      (state.loader = false), (state.message = '');
    },
    errorHandler: (state, action) => {
      (state.loader = false), (state.message = action.payload);
    },
    exceptionHandler: (state, action) => {
      {
        (state.loader = false), (state.message = action.payload);
      }
    },
  },
});

export const {showLoader, hideLoader, errorHandler, exceptionHandler} =
  uISlice.actions;

export default uISlice.reducer;
