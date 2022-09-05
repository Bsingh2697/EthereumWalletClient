/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Appearance, StyleSheet, View} from 'react-native';
import './shim';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import {GLOBAL_STYLES} from './src/utils/globalStyles';
import {COLORS} from './src/utils/constants/colors';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/libs/ToastConfig';
import Config from 'react-native-config';
import {etherScanNetwork} from './src/Etherscan/constants/escanNetwork';
import {infuraNetworkConstants} from './src/Infura/InfuraEndpoints';
import TokenContract from './src/components/Ethereum/TokenContract';
import MarketplaceContract from './src/components/Ethereum/MarketplaceContract';
import axios, {AxiosRequestConfig} from 'axios';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    // console.log('Base URL', Config.IOS_BASE_URL);
    // console.log('PORT', Config.PORT);
    // console.log('E Base URL', etherScanNetwork.base_url());
    // console.log('I Base URL', infuraNetworkConstants.base_url());
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
        <Toast config={toastConfig} />
      </SafeAreaProvider>
      {/* <MarketplaceContract /> */}
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
