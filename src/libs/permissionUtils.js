import {Platform} from 'react-native';
import {
  request,
  PERMISSIONS,
  openSettings,
  checkNotifications,
  requestNotifications,
  // NotificationOption,
} from 'react-native-permissions';
import {STRING_CONSTANTS} from '../utils/constants/stringConstants';
import {showAlertDialog, showDoubleActionAlertDialog} from './nativeAlert';

const showSettingsDialog = (text, cancelCallback) => {
  showDoubleActionAlertDialog(
    STRING_CONSTANTS.permissions.permission_required_text,
    text,
    STRING_CONSTANTS.permissions.settings_text,
    () => openSettings(),
    STRING_CONSTANTS.permissions.cancel_text,
    () => cancelCallback(),
  );
};

// GALLERY PERMISSION
export const checkGalleryPermissions = (successCallback, cancelCallback) => {
  request(
    Platform.select({
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    }),
  ).then(response => {
    console.log('GRANT RESP : ', response);
    if (response === 'granted' || response === 'limited') {
      successCallback();
    } else if (response === 'blocked' || response === 'denied') {
      showSettingsDialog(
        STRING_CONSTANTS.permissions.gallery_permission_text,
        cancelCallback,
      );
    } else if (response === 'unavailable') {
      showAlertDialog(
        STRING_CONSTANTS.app_name,
        STRING_CONSTANTS.permissions.no_gallery_text,
        STRING_CONSTANTS.misc.ok_text,
        cancelCallback,
      );
    }
  });
};
