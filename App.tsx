/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import './shim';
import AnimationsPrac from './src/components/Animation/AnimationsPrac';
import Ether from './src/components/Ethereum/AccountsEther';
import ContractEther from './src/components/Ethereum/ContractsEther';
import SigningTransaction from './src/components/Ethereum/SigningTransaction';
import DeployingSmartContacts from './src/components/Ethereum/DeployingSmartContracts';
import DeployingSmartContractTwo from './src/components/Ethereum/DeployingSmartContractTwo';
import SplashScreen from 'react-native-splash-screen';
import {fonts} from './src/utils/constants/fonts';
import {storageInstance} from './src/redux/localStorage/localStorage';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
