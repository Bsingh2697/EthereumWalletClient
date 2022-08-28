import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBAL_STYLES} from '../../utils/globalStyles';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NAVIGATIONS} from '../../utils/constants/navigationConstants';
import {OnBoardingProp, OuterStackParamList} from '../../navigation/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../utils/constants/colors';
import {icons} from '../../utils/constants/assets';
import {useDispatch} from 'react-redux';
import {testAPI} from '../../network/requests';
import {AppDispatch} from '../../redux/store/store';

const OnBoarding = ({route, navigation}: OnBoardingProp) => {
  const dispatch = useDispatch<AppDispatch>();

  const {colors} = useTheme();
  return (
    <>
      <ImageBackground
        source={icons.onBoarding}
        style={{
          alignSelf: 'center',
          justifyContent: 'space-between',
          flex: 1,
          width: '100%',
        }}
        resizeMode="center">
        <View
          style={[
            {
              marginTop: 100,
              marginHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <View>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryMedium24,
                {textDecorationLine: 'underline', letterSpacing: 0.2},
              ]}>
              Welcome to
            </Text>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryMedium24,
                {
                  textDecorationLine: 'underline',
                  paddingTop: 3,
                  letterSpacing: 0.2,
                },
              ]}>
              ethWallet
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATIONS.LOGIN_SCREEN)}>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryRegular12,
                {textDecorationLine: 'underline'},
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            GLOBAL_STYLES.longButtonStyle,
            {marginBottom: 50, marginHorizontal: 20},
          ]}
          onPress={() => navigation.navigate(NAVIGATIONS.SIGNUP_SCREEN)}>
          <Text style={[GLOBAL_STYLES.longButtonTxtSt]}>GET STARTED</Text>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
