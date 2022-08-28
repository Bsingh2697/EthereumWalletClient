import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {keychainData} from '../redux/localStorage/localStorage';
import {
  reducer_user,
  setTokenData,
  setUserData,
} from '../redux/slices/userslice';
import {AppDispatch} from '../redux/store/store';
import {appConstants} from '../utils/constants/appConstants';
import MainNavigation from './MainNaviagtion';

const AppNavigator = () => {
  useEffect(() => {
    setReducers();
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  const setReducers = async () => {
    // let storageuserData = storageInstance.getString(appConstants.user_data);
    // let userData: reducer_user | undefined = storageuserData
    //   ? JSON.parse(storageuserData)
    //   : undefined;
    // let tokenData = storageInstance.getString(appConstants.token_data);

    // userData && dispatch(setUserData(userData));
    // tokenData && dispatch(setTokenData(tokenData));

    // FETCHING FROM STORAGE
    let userData = await keychainData.getUserData();
    let token_data = await keychainData.getUserToken();

    // SETTING IN REDUX
    userData && dispatch(setUserData(userData));
    token_data && dispatch(setTokenData(token_data));
  };

  return <MainNavigation />;
};

export default AppNavigator;
