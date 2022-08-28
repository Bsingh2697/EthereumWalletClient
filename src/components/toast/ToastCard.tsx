import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import {images, icons} from '../../utils/constants/assets';
import {COLORS} from '../../utils/constants/colors';
import {fonts} from '../../utils/constants/fonts';
import {emptyFunction} from '../../utils/globalFunctions';
import {GLOBAL_STYLES} from '../../utils/globalStyles';
import {
  AppToastProps,
  ToastBorderColorType,
  ToastColorType,
  ToastIconType,
  ToastType,
} from './collection';

//Usage example
// showToast("toastHeader", "toastBody", ToastType.INFO, ToastIconType.CROSS)

const ToastCard = ({
  containerStyle = {},
  textStyle = {},
  message,
  messagebody,
  onClose = emptyFunction,
  type,
}: // toastIcon,
AppToastProps) => {
  const getToastBackgroundColor = () => {
    switch (type) {
      case ToastType.ERROR:
        return ToastColorType.ERROR;
      case ToastType.SUCCESS:
        return ToastColorType.SUCCESS;
      case ToastType.INFO:
        return ToastColorType.INFO;
      default:
        return ToastColorType.DEFAULT;
    }
  };

  useEffect(() => {
    console.log('COLOR BG', type);
    console.log('COLOR BDR', type);
  }, []);

  const {height, width} = Dimensions.get('window');

  return (
    <Animated.View
      style={[
        styles.toastContainerStyle,
        {
          backgroundColor: getToastBackgroundColor(),
        },
        containerStyle,
      ]}>
      <Pressable style={styles.textContainerStyle} onPress={onClose}>
        <View style={styles.msgView}>
          <Text
            numberOfLines={3}
            style={[
              GLOBAL_STYLES.textPrimaryMedium12,
              styles.toastTxtSt,
              textStyle,
            ]}>
            {message}
          </Text>
          <Text
            numberOfLines={3}
            style={[
              GLOBAL_STYLES.textPrimaryRegular10,
              styles.toastTxtSt,
              textStyle,
            ]}>
            {messagebody}
          </Text>
        </View>
        <Pressable onPress={onClose} style={styles.closeIconStyle}>
          <Image source={icons.dismiss_toast} />
        </Pressable>
      </Pressable>
    </Animated.View>
  );
};

export default ToastCard;

const styles = StyleSheet.create({
  msgView: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  toastContainerStyle: {
    flexDirection: 'row',
    marginHorizontal: 10,
    // marginTop: dimensConstants.standard.margin_vertical,
    // marginTop: 20,
    padding: 10,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: 1000,
    // borderWidth: 0.5,
  },
  textContainerStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  closeIconStyle: {
    marginLeft: 5,
    alignItems: 'center',
  },
  toastTxtSt: {
    color: COLORS.black,
  },
});
