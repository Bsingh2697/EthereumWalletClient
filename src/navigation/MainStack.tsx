import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/store';
import {appConstants} from '../utils/constants/appConstants';
import {NAVIGATIONS} from '../utils/constants/navigationConstants';
import InnerNavigation from './InnerNavigation';
import OuterNavigation from './OuterNavigation';
import {RootStackParamList} from './types';

export default function MainStack() {
  const AppStack = createNativeStackNavigator<RootStackParamList>();
  const token = useSelector<RootState>(state => state.user.token);

  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      {token ? (
        <AppStack.Screen
          name={NAVIGATIONS.INNER_NAV}
          component={InnerNavigation}
        />
      ) : (
        <AppStack.Screen
          name={NAVIGATIONS.OUTER_NAV}
          component={OuterNavigation}
        />
      )}
    </AppStack.Navigator>
  );
}
