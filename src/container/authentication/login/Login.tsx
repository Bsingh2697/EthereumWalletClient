import {
  Appearance,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {createRef, useEffect, useImperativeHandle, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp, useTheme} from '@react-navigation/native';
import {LoginProp, OuterStackParamList} from '../../../navigation/types';
import {NAVIGATIONS} from '../../../utils/constants/navigationConstants';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';
import LoggedInHeader from '../../../components/headers/LoggedInHeader';
import InputField from '../../../components/InputField/InputField';
import {icons, images} from '../../../utils/constants/assets';
import {STRING_CONSTANTS} from '../../../utils/constants/stringConstants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../utils/constants/colors';
import OuterHeader from '../../../components/headers/OuterHeader';
import {darkTheme} from '../../../utils/globalFunctions';
import LoginForm from './LoginForm';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import Loader from '../../../components/Loader/Loader';

type Props = LoginProp & {
  children: React.ReactElement;
};

const Login = ({route, navigation, children}: Props) => {
  // *************************** LOADER SELECTOR ***************************
  const loader = useSelector<RootState>(state => state.ui.loader);
  // *************************** Use THEME ***************************
  const {colors} = useTheme();

  return (
    <>
      {loader ? <Loader /> : <></>}
      <OuterHeader
        leftBackground={icons.encircle}
        leftIcon={icons.outerHeaderLogo}
        leftPress={() => console.log('Left Press')}
        rightBackground={icons.encircle}
        rightIcon={darkTheme() ? icons.cross_white : icons.cross}
        // rightIcon={icons.cross_white}
        rightPress={() => navigation.goBack()}
        centerBackground={icons.encircle}
        centerIcon={icons.bell}
        centerText={STRING_CONSTANTS.labels.label_login}
        centerPress={() => console.log('CEnter Press')}>
        <View style={styles.viewSt}>
          <LoginForm />
          {/* <Text style={[GLOBAL_STYLES.textPrimaryRegular20]}>Login Screen</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATIONS.SIGNUP_SCREEN)}>
          <Text style={[GLOBAL_STYLES.textPrimaryRegular20]}>Go TO SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATIONS.ONBOARDING_SCREEN)}>
          <Text style={[GLOBAL_STYLES.textPrimaryRegular20]}>
            Go TO OnBoarding
          </Text>
        </TouchableOpacity> */}
        </View>
      </OuterHeader>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  viewSt: {
    marginTop: 80,
    paddingHorizontal: 20,
  },
});
