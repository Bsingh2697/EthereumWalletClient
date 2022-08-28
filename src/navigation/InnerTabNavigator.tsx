import React from 'react';
import {NAVIGATIONS} from '../utils/constants/navigationConstants';
import {InnerStackParamList} from './types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../container/dashboard/home/Home';
import Marketplace from '../container/dashboard/marketplace/Marketplace';
import Profile from '../container/dashboard/profile/Profile';
import {icons} from '../utils/constants/assets';
import {Image} from 'react-native';
import {GLOBAL_STYLES} from '../utils/globalStyles';
import Stats from '../container/dashboard/stats/Stats';
import {COLORS} from '../utils/constants/colors';
import {darkTheme} from '../utils/globalFunctions';

const InnerTabNavigation = () => {
  const TabNavigator = createBottomTabNavigator<InnerStackParamList>();
  return (
    <TabNavigator.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: darkTheme() ? COLORS.black : COLORS.white,
        },
      }}>
      <TabNavigator.Screen
        name={NAVIGATIONS.HOME_SCREEN}
        component={Home}
        options={() => ({
          tabBarIcon: () => (
            <Image style={[GLOBAL_STYLES.bottomIconSt]} source={icons.home} />
          ),
        })}
      />
      <TabNavigator.Screen
        name={NAVIGATIONS.MARKETPLACE_SCREEN}
        component={Marketplace}
        options={{
          tabBarIcon: () => (
            <Image
              style={[GLOBAL_STYLES.bottomIconSt]}
              source={icons.marketplace}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name={NAVIGATIONS.STATS_SCREEN}
        component={Stats}
        options={{
          tabBarIcon: () => (
            <Image style={[GLOBAL_STYLES.bottomIconSt]} source={icons.stats} />
          ),
        }}
      />
      <TabNavigator.Screen
        name={NAVIGATIONS.PROFILE_SCREEN}
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image
              style={[GLOBAL_STYLES.bottomIconSt]}
              source={icons.profile}
            />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
};
export default InnerTabNavigation;
