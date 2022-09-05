import {
  Appearance,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useTheme} from '@react-navigation/native';
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
import {useDispatch} from 'react-redux';
import {object, string} from 'yup';
import {Formik} from 'formik';
import {showToast} from '../../../libs/ToastConfig';
import {ToastType} from '../../../components/toast/collection';
import {SignUpProp} from '../../../navigation/types';
import {signUpUser} from '../../../network/requests';
import {AppDispatch} from '../../../redux/store/store';
import {
  reducer_user,
  setTokenData,
  setUserData,
} from '../../../redux/slices/userslice';
import {keychainData} from '../../../redux/localStorage/localStorage';
import {appConstants} from '../../../utils/constants/appConstants';
import Web3 from 'web3';
import {infuraNetworkConstants} from '../../../Infura/InfuraEndpoints';

type intialState = {
  username: string;
  password: string;
};

type createEthereumAccount = {
  address: string;
  privateKey: string;
};

const SignUpForm = () => {
  // *************************** WEB3 CONSTANT ***************************
  const web3 = new Web3(infuraNetworkConstants.base_url());
  // *************************** Use Navigation ***************************
  const navigation = useNavigation();

  // *************************** Use Theme ***************************
  const {colors} = useTheme();
  // *************************** Use State ***************************
  const [showPassword, setshowPassword] = useState(false);
  // *************************** Initial Values ***************************
  const initialState: intialState = {
    username: '',
    password: '',
  };
  // *************************** REFS ***************************
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // *************************** Validation Schema ***************************
  const validationSchema = object().shape({
    username: string()
      .min(8, STRING_CONSTANTS.errors.usernameSmall)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9])(?!.*( )).{8,24}$/,
        STRING_CONSTANTS.errors.invalidUsername,
      )
      .required(STRING_CONSTANTS.errors.usernameRequired),
    password: string()
      .min(8, STRING_CONSTANTS.errors.passwordSmall)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9])(?!.*( )).{8,24}$/,
        STRING_CONSTANTS.errors.invalidPassword,
      )
      .required(STRING_CONSTANTS.errors.passwordRequired),
  });
  // *************************** Dispatch ***************************
  const dispatch = useDispatch<AppDispatch>();
  // *************************** UseEffects ***************************
  useEffect(() => {
    usernameRef?.current?.focus();
  }, []);
  // *************************** Create ETHEREUM WALLET Functions ***************************

  const createEtherAccount = async (): Promise<createEthereumAccount> => {
    const newWallet = web3.eth.accounts.wallet.create(1);
    const newAccount = newWallet[0];
    return {address: newAccount.address, privateKey: newAccount.privateKey};
  };

  // *************************** Submit Account Request Functions ***************************
  const submitHandler = async (
    values: any,
    setErrors: any,
    setTouched: any,
  ) => {
    let accData = await createEtherAccount();

    console.log('RETURNED DATA :', accData);
    if (accData) {
      let data = {
        privateKey: accData?.privateKey,
        address: accData?.address,
        username: values.username,
        password: values.password,
      };
      console.log('Signup Data : ', data);
      dispatch(
        signUpUser(
          data,
          async (response: any) => {
            console.log('Response Register END : ', response.data.user);
            // *************************** Preparing DATA FOR REDUCER and LOCAL STORAGE ************************
            let storeData: reducer_user = {
              address: response.data?.user?.address,
              password: values.password,
              username: values.username,
              user_id: response.data?.user?.user_id,
            };
            let tokenData = response.data?.token;
            console.log('User Data', storeData);
            // *************************** SETTING DATA IN REDUCER ************************
            dispatch(setUserData(storeData));
            dispatch(setTokenData(tokenData));
            // *************************** SETTING DATA IN LOCAL STORAGE ************************
            // storageInstance.set(
            //   appConstants.user_data,
            //   JSON.stringify(storeData),
            // );
            // storageInstance.set(appConstants.token_data, tokenData);
            await keychainData.setData(storeData, tokenData);
          },
          (error: any) => {
            console.log('ERROR Register END : ', error);
            showToast(
              STRING_CONSTANTS.errors.wentWront,
              STRING_CONSTANTS.errors.tryDifferentUsername,
              ToastType.ERROR,
            );
          },
        ),
      );
    } else {
      showToast('Some error occured', 'Try creating a another account');
    }

    setErrors({});
    setTouched({});
  };
  const resetErrors = (
    setErrors: any,
    setTouched: any,
    setFieldTouched: any,
    setFieldError: any,
  ) => {
    setTimeout(
      () => (
        setErrors({}), setTouched({}), setFieldTouched({}), setFieldError({})
      ),
      500,
    );
  };
  return (
    <View>
      <Formik
        initialValues={initialState}
        onSubmit={(values, {setErrors, setTouched}) => {
          console.log(values), submitHandler(values, setErrors, setTouched);
        }}
        validationSchema={validationSchema}>
        {({
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
          setErrors,
          setTouched,
          setFieldTouched,
          setFieldError,
        }) => (
          <>
            <InputField
              setFormValue={(value: string) => setFieldValue('username', value)}
              ref={usernameRef}
              label={STRING_CONSTANTS.forms.username}
              placeholder={STRING_CONSTANTS.placeholders.username}
              onSubmitEditing={() => passwordRef?.current?.focus()}
              onTap={() => usernameRef?.current?.focus()}
            />
            {errors?.username && touched?.username
              ? showToast(errors?.username, errors?.username, ToastType.ERROR)
              : null}
            {touched?.username && errors?.username
              ? resetErrors(
                  setErrors,
                  setTouched,
                  setFieldTouched,
                  setFieldError,
                )
              : null}
            <View style={GLOBAL_STYLES.spacingView}></View>
            <InputField
              setFormValue={(value: string) => setFieldValue('password', value)}
              ref={passwordRef}
              label={STRING_CONSTANTS.forms.password}
              placeholder={STRING_CONSTANTS.placeholders.password}
              onSubmitEditing={() => handleSubmit()}
              onTap={() => usernameRef?.current?.focus()}
              onRightIconPress={() => setshowPassword(!showPassword)}
              rightIcon={showPassword ? icons.open_eye : icons.close_eye}
              showContent={showPassword ? false : true}
            />
            {!errors.username && errors.password && touched.password
              ? showToast(errors.password, errors.password, ToastType.ERROR)
              : null}
            {!errors.username && touched.password && errors.password
              ? resetErrors(
                  setErrors,
                  setTouched,
                  setFieldTouched,
                  setFieldError,
                )
              : null}
            <Pressable
              onPress={handleSubmit}
              //   onPress={() => console.log(values)}
              style={[
                GLOBAL_STYLES.longButtonStyle,
                {borderColor: colors.border, marginTop: 60},
              ]}>
              <Text style={GLOBAL_STYLES.longButtonTxtSt}>
                {STRING_CONSTANTS.labels.label_signUp}
              </Text>
            </Pressable>
          </>
        )}
      </Formik>
      <Pressable
        onPress={() => navigation.navigate('LOGIN_SCREEN')}
        style={[GLOBAL_STYLES.centered, styles.loginSt]}>
        <Text style={[GLOBAL_STYLES.textPrimaryRegular14]}>
          {STRING_CONSTANTS.misc.login_instead}
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  loginSt: {
    marginTop: 80,
  },
});
