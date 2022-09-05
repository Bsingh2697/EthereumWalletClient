import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OnBoarding from '../container/onBoarding/OnBoarding';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATIONS} from '../utils/constants/navigationConstants';
import {InnerStackParamList} from './types';
import InnerTabNavigation from './InnerTabNavigator';
import SendEth from '../container/dashboard/home/sendReceive/SendEth';
import ReceiveEth from '../container/dashboard/home/sendReceive/ReceiveEth';
import NftDetails from '../container/dashboard/marketplace/nftDetails/NftDetails';
import BuyNft from '../container/dashboard/marketplace/marketOperations/BuyNft';
import SellNft from '../container/dashboard/marketplace/marketOperations/SellNft';
import FAQ from '../container/dashboard/profile/FAQ';

const InnerNavigation = () => {
  const InnerNavigator = createNativeStackNavigator<InnerStackParamList>();
  return (
    <InnerNavigator.Navigator screenOptions={{headerShown: false}}>
      <InnerNavigator.Screen
        name={NAVIGATIONS.INNER_TAB_NAVIGATION}
        component={InnerTabNavigation}
      />
      <InnerNavigator.Screen
        name={NAVIGATIONS.SEND_ETH_SCREEN}
        component={SendEth}
      />
      <InnerNavigator.Screen
        name={NAVIGATIONS.RECEIVE_ETH_SCREEN}
        component={ReceiveEth}
      />
      <InnerNavigator.Screen
        name={NAVIGATIONS.NFT_DETAILS_SCREEN}
        component={NftDetails}
      />
      <InnerNavigator.Screen
        name={NAVIGATIONS.BUY_NFT_SCREEN}
        component={BuyNft}
      />
      <InnerNavigator.Screen
        name={NAVIGATIONS.SELL_NFT_SCREEN}
        component={SellNft}
      />
      <InnerNavigator.Screen name={NAVIGATIONS.FAQ_SCREEN} component={FAQ} />
    </InnerNavigator.Navigator>
  );
};

export default InnerNavigation;
