import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {GLOBAL_STYLES} from '../../../../utils/globalStyles';
import {COLORS} from '../../../../utils/constants/colors';
import News from './News';
import Articles from './Articles';

const MiscInfoTabs = () => {
  //   const renderScene = SceneMap({
  //     newsScene: News,
  //     articleScene: Articles,
  //   });
  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'newsScene':
        return <News index={index} />;
      case 'articleScene':
        return <Articles index={index} />;
      default:
        return null;
    }
  };

  const {height, width} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'newsScene', title: 'Latest News'},
    {key: 'articleScene', title: 'Daily Analysis'},
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
              backgroundColor: COLORS.white_overlay_med,
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
    <View style={{flex: 1, height: '100%', width: '100%', marginTop: 20}}>
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

export default MiscInfoTabs;

const styles = StyleSheet.create({});
