import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NAVIGATIONS} from '../utils/constants/navigationConstants';
import InnerNavigation from './InnerNavigation';
import OuterNavigation from './OuterNavigation';

export default function MainStack() {
  const AppStack = createNativeStackNavigator();
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen
        name={NAVIGATIONS.OUTER_NAV}
        component={OuterNavigation}
      />
      <AppStack.Screen
        name={NAVIGATIONS.INNER_NAV}
        component={InnerNavigation}
      />
    </AppStack.Navigator>
  );
}
