import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../utils/constants/colors';
import {
  darkTheme,
  elevationShadowStyle,
  isIos,
} from '../../utils/globalFunctions';
import {GLOBAL_STYLES} from '../../utils/globalStyles';
import {fonts} from '../../utils/constants/fonts';
import {useTheme} from '@react-navigation/native';

interface headerProps {
  children?: React.ReactElement;
  leftBackground?: ImageSourcePropType;
  leftIcon?: ImageSourcePropType;
  leftText?: string;
  leftPress?: Function;
  rightBackground?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  rightText?: string;
  rightPress?: Function;
  centerBackground?: ImageSourcePropType;
  centerIcon?: ImageSourcePropType;
  centerText?: string;
  centerPress?: Function;
}

const OuterHeader = ({
  children,
  leftBackground,
  leftIcon,
  leftText,
  leftPress,
  rightBackground,
  rightIcon,
  rightText,
  rightPress,
  centerBackground,
  centerIcon,
  centerPress,
  centerText,
}: headerProps) => {
  const {width, height} = Dimensions.get('window');
  const {colors} = useTheme();

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeAreaSt}>
      <View
        style={[
          elevationShadowStyle(2),
          styles.headerView,
          isIos() ? {} : {paddingTop: 20},
          {backgroundColor: colors.background},
        ]}>
        <Pressable
          onPress={() => leftPress && leftPress()}
          style={styles.pressableLeftSt}>
          {leftText ? (
            <Text style={[GLOBAL_STYLES.textPrimaryMedium16]} numberOfLines={1}>
              {leftText}
            </Text>
          ) : (
            <View style={styles.btnView}>
              {leftBackground ? <Image source={leftBackground} /> : null}
              {leftIcon ? (
                <Image style={styles.imgSt} source={leftIcon} />
              ) : null}
            </View>
          )}
        </Pressable>
        <Pressable
          onPress={() => centerPress && centerPress()}
          style={[styles.centerPressable, {width: width - 200}]}>
          {centerText ? (
            <Text style={[GLOBAL_STYLES.textPrimaryMedium18]} numberOfLines={1}>
              {centerText}
            </Text>
          ) : (
            <View style={styles.btnView}>
              {centerBackground && <Image source={centerBackground} />}
              {centerIcon && (
                <Image style={styles.imgSt} source={centerIcon!} />
              )}
            </View>
          )}
        </Pressable>
        <Pressable
          onPress={() => rightPress && rightPress()}
          style={styles.pressableRightSt}>
          {rightText ? (
            <Text style={[GLOBAL_STYLES.textPrimaryMedium16]} numberOfLines={1}>
              {rightText}
            </Text>
          ) : (
            <View style={styles.btnView}>
              {rightBackground && <Image source={rightBackground} />}
              {rightIcon && <Image style={styles.imgSt} source={rightIcon!} />}
            </View>
          )}
        </Pressable>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default OuterHeader;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomColor: COLORS.common_divider_color,
    // borderBottomWidth: 0.2,
  },
  pressableLeftSt: {
    flex: 1,
    alignItems: 'flex-start',
  },
  pressableRightSt: {
    flex: 1,
    alignItems: 'flex-end',
  },
  centerPressable: {
    flex: 0,
    alignItems: 'center',
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSt: {
    position: 'absolute',
  },
  safeAreaSt: {
    flex: 1,
  },
});
