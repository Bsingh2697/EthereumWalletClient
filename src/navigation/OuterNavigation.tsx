import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OnBoarding from '../container/onBoarding/OnBoarding';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATIONS} from '../utils/constants/navigationConstants';
import Login from '../container/authentication/login/Login';
import Signup from '../container/authentication/signup/Signup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OuterStackParamList} from './types';
import Terms from '../container/termsAndPolicy/Terms';
import PrivacyPolicy from '../container/termsAndPolicy/PrivacyPolicy';

const OuterNavigation = () => {
  const OuterNavigator = createNativeStackNavigator<OuterStackParamList>();
  return (
    <OuterNavigator.Navigator screenOptions={{headerShown: false}}>
      <OuterNavigator.Screen
        name={NAVIGATIONS.ONBOARDING_SCREEN}
        component={OnBoarding}
      />
      <OuterNavigator.Screen
        name={NAVIGATIONS.SIGNUP_SCREEN}
        component={Signup}
        options={() => ({
          animation: 'fade',
        })}
      />
      <OuterNavigator.Screen
        name={NAVIGATIONS.LOGIN_SCREEN}
        component={Login}
        options={() => ({
          animation: 'fade',
        })}
      />
      <OuterNavigator.Screen
        name={NAVIGATIONS.TERMS_SCREEN}
        component={Terms}
      />
      <OuterNavigator.Screen
        name={NAVIGATIONS.POLICY_SCREEN}
        component={PrivacyPolicy}
      />
    </OuterNavigator.Navigator>
  );
};

export default OuterNavigation;
