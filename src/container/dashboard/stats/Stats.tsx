import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useState} from 'react';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TransactionsHistory from './transactions/TransactionsHistory';
import NftsHistory from './nfts/NftsHistory';
import {COLORS} from '../../../utils/constants/colors';
import {infuraNetworkConstants} from '../../../Infura/InfuraEndpoints';

const Stats = () => {
  const renderScene = SceneMap({
    transactionScene: TransactionsHistory,
    nftsScene: NftsHistory,
  });

  const {height, width} = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'transactionScene', title: 'Transactions'},
    {key: 'nftsScene', title: 'NFTs'},
  ]);

  const renderTabBarHandle = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'transparent'}}
      activeColor={'#123123'}
      inactiveColor={'#100000'}
      style={{
        backgroundColor: COLORS.theme_color_blue_two,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 5,
      }}
      tabStyle={{
        height: 35,
        paddingTop: 0,
      }}
      renderLabel={({route, focused}) =>
        focused ? (
          <View
            style={{
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white_overlay_med,
              top: -1,
            }}>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryRegular12,
                {color: COLORS.white},
              ]}>
              {route?.title}
            </Text>
          </View>
        ) : (
          <View
            style={{
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
              // left: -45,
              width: (width - 40) / 2,
              top: -1,
            }}>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryRegular12,
                {color: COLORS.white},
              ]}>
              {route?.title}
            </Text>
          </View>
        )
      }
    />
  );

  return (
    <View style={{marginTop: 50, flex: 1}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: width}}
        renderTabBar={renderTabBarHandle}
      />
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({});
