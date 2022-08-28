import {
  Appearance,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
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
import {useDispatch} from 'react-redux';
import {object, string} from 'yup';
import {Formik} from 'formik';
import {showToast} from '../../../libs/ToastConfig';
import {ToastType} from '../../../components/toast/collection';
import {loginUser, testAPI} from '../../../network/requests';
import {AppDispatch} from '../../../redux/store/store';
import {
  reducer_user,
  setUserData,
  setTokenData,
} from '../../../redux/slices/userslice';
import {keychainData} from '../../../redux/localStorage/localStorage';
import {appConstants} from '../../../utils/constants/appConstants';
import {TokenType} from '../../../network/collection';
import {hideLoader, showLoader} from '../../../redux/slices/uiSlice';

type intialState = {
  username: string;
  password: string;
};

const LoginForm = () => {
  // *************************** Use Theme ***************************
  const {colors} = useTheme();

  // *************************** Initial Values ***************************
  const initialState: intialState = {
    username: '',
    password: '',
  };
  // *************************** Use State ***************************
  const [showPassword, setshowPassword] = useState(false);
  // *************************** REFS ***************************
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // *************************** Validation Schema ***************************
  const validationSchema = object().shape({
    username: string()
      .min(8, STRING_CONSTANTS.errors.usernameSmall)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9])(?!.*( )).{8,}$/,
        STRING_CONSTANTS.errors.invalidUsername,
      )
      .required(STRING_CONSTANTS.errors.usernameRequired),
    password: string()
      .min(8, STRING_CONSTANTS.errors.passwordSmall)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9])(?!.*( )).{8,}$/,
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
  // *************************** Functions ***************************
  const submitHandler = (values: any, setErrors: any, setTouched: any) => {
    let data = {
      username: values.username,
      password: values.password,
    };
    console.log('Login Data : ', data);
    dispatch(
      loginUser(
        data,
        async (response: any) => {
          console.log('Response END : ', response.data.user);
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
          console.log('ERROR END : ', error);
          showToast(error?.header, error?.body, ToastType.ERROR);
        },
      ),
    );

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
                {STRING_CONSTANTS.labels.label_login}
              </Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
