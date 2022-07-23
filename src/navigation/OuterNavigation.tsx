import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OnBoarding from '../container/onBoarding/OnBoarding';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATIONS} from '../utils/constants/navigationConstants';

const OuterNavigation = () => {
  const OuterNavigator = createNativeStackNavigator();
  return (
    <OuterNavigator.Navigator screenOptions={{headerShown: false}}>
      <OuterNavigator.Screen
        name={NAVIGATIONS.ONBOARDING_SCREEN}
        component={OnBoarding}
      />
    </OuterNavigator.Navigator>
  );
};

export default OuterNavigation;
