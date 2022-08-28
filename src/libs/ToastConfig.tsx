import React from 'react';
import {ToastType} from '../components/toast/collection';
import Toast, {ToastShowParams} from 'react-native-toast-message';
import ToastCard from '../components/toast/ToastCard';

export const toastConfig = {
  default: (props: ToastShowParams) => (
    <ToastCard
      {...props}
      type={props.props.type}
      onClose={props.onPress}
      message={props.text1}
      messagebody={props.text2}
    />
  ),
};

export const showToast = (
  message: string,
  messagebody: string,
  type: ToastType = ToastType.SUCCESS,
  containerStyle?: any,
  textStyle?: any,
) => {
  console.log('SHOW TOAST', message, messagebody);
  // Toast.show({text1:message, autoHide:false})
  Toast.show({
    autoHide: true,
    text1: message,
    text2: messagebody,
    type: ToastType.DEFAULT,
    visibilityTime: 3000,
    position: 'top',
    // coverScreen:true,
    onPress: () => Toast.hide(),
    props: {
      type: type,
      onClose: () => Toast.hide(),
      containerStyle: containerStyle,
      textStyle: textStyle,
    },
  });
};
