import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Platform,
} from 'react-native';
import React from 'react';
import {OuterStackParamList, SignUpProp} from '../../../navigation/types';
import {NAVIGATIONS} from '../../../utils/constants/navigationConstants';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';
import OuterHeader from '../../../components/headers/OuterHeader';
import {useTheme} from '@react-navigation/native';
import {icons, images} from '../../../utils/constants/assets';
import {darkTheme} from '../../../utils/globalFunctions';
import {showToast} from '../../../libs/ToastConfig';
import {ToastType} from '../../../components/toast/collection';
import {STRING_CONSTANTS} from '../../../utils/constants/stringConstants';
import SignUpForm from './SignUpForm';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import Loader from '../../../components/Loader/Loader';

const Signup = ({route, navigation}: SignUpProp) => {
  // *************************** LOADER SELECTOR ***************************
  const loader = useSelector<RootState>(state => state.ui.loader);
  // *************************** Use THEME ***************************
  const {colors} = useTheme();
  const toasthandler = () => {
    showToast('toastHeader', 'toastBody', ToastType.ERROR);
  };
  return (
    <>
      {loader ? <Loader /> : <></>}
      <OuterHeader
        leftBackground={icons.encircle}
        leftIcon={icons.outerHeaderLogo}
        leftPress={() => console.log('Left Press')}
        rightBackground={icons.encircle}
        rightIcon={darkTheme() ? icons.cross_white : icons.cross}
        rightPress={() => navigation.goBack()}
        centerBackground={icons.encircle}
        centerIcon={icons.bell}
        centerText={STRING_CONSTANTS.labels.label_signUp}
        centerPress={() => console.log('CEnter Press')}>
        <KeyboardAvoidingView style={styles.viewSt}>
          <Pressable
            onPress={() => Keyboard.dismiss()}
            style={[GLOBAL_STYLES.flexOneStyle, styles.topPressSt]}>
            <SignUpForm />
            <View style={styles.acceptanceSt}>
              <Text style={GLOBAL_STYLES.textPrimaryRegular12}>
                {STRING_CONSTANTS.messages.bySigningUp}
              </Text>
              <Text style={GLOBAL_STYLES.textPrimaryRegular12}>
                {' '}
                {STRING_CONSTANTS.messages.youAgreeToOur}{' '}
              </Text>
              <Text
                style={[
                  GLOBAL_STYLES.textPrimaryMedium12,
                  GLOBAL_STYLES.textunderline,
                ]}>
                {STRING_CONSTANTS.messages.termsOfService}
              </Text>
              <Text style={GLOBAL_STYLES.textPrimaryRegular12}>
                {' '}
                {STRING_CONSTANTS.messages.and}{' '}
              </Text>
              <Text
                style={[
                  GLOBAL_STYLES.textPrimaryMedium12,
                  GLOBAL_STYLES.textunderline,
                ]}>
                {STRING_CONSTANTS.labels.label_privacy}
              </Text>
            </View>
            {/* <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATIONS.LOGIN_SCREEN)}>
          <Text style={[GLOBAL_STYLES.textPrimaryBold10]}>SignUp Screen</Text>
          <Text style={[GLOBAL_STYLES.textPrimaryBold10]}>Go TO Login</Text>
        </TouchableOpacity>
        <Button title="Show toast" onPress={toasthandler} /> */}
          </Pressable>
        </KeyboardAvoidingView>
      </OuterHeader>
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  viewSt: {
    marginTop: 80,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flex: 1,
  },
  acceptanceSt: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  topPressSt: {
    justifyContent: 'space-between',
  },
});
