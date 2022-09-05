import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';
import {COLORS} from '../../../utils/constants/colors';
import {useDispatch} from 'react-redux';
import {isIos, logoutHandler} from '../../../utils/globalFunctions';
import {AppDispatch} from '../../../redux/store/store';
import {ProfileProp} from '../../../navigation/types';
import {icons} from '../../../utils/constants/assets';

const Profile = ({route, navigation}: ProfileProp) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ImageBackground source={icons.backgroundmp} style={styles.profileViewSt}>
      <View>
        <View style={styles.itemViewSt}>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryRegular16,
              {color: COLORS.gray_shade_two},
            ]}>
            Privacy Policy
          </Text>
        </View>
        <View style={styles.dividerSt}></View>
        <View style={styles.itemViewSt}>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryRegular16,
              {color: COLORS.gray_shade_two},
            ]}>
            Terms & Conditions
          </Text>
        </View>
        <View style={styles.dividerSt}></View>
        <Pressable
          onPress={() => navigation.navigate('FAQ_SCREEN')}
          style={styles.itemViewSt}>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryRegular16,
              {color: COLORS.gray_shade_two},
            ]}>
            FAQ
          </Text>
        </Pressable>
        <View style={styles.dividerSt}></View>
        <Pressable
          onPress={() => dispatch(logoutHandler)}
          style={styles.itemViewSt}>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryRegular16,
              {color: COLORS.gray_shade_two},
            ]}>
            Logout
          </Text>
        </Pressable>
        <View style={styles.dividerSt}></View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text
          style={[
            GLOBAL_STYLES.textPrimaryRegular10,
            {color: COLORS.gray_shade_one},
          ]}>
          Developed by Bharat Singh
        </Text>
        <Text
          style={[
            GLOBAL_STYLES.textPrimaryRegular10,
            {color: COLORS.gray_shade_one},
          ]}>
          Copyright ® 2022 ethWallet. All rights reserved
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileViewSt: {
    paddingTop: isIos() ? 80 : 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 10,
  },
  itemViewSt: {
    borderBottomWidth: 0.3,
    borderColor: COLORS.gray_shade_one,
    paddingBottom: 15,
  },
  dividerSt: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: COLORS.gray_shade_one,
  },
});
