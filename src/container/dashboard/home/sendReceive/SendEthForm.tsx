import {
  Appearance,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
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
import {LoginProp, OuterStackParamList} from '../../../../navigation/types';
import {NAVIGATIONS} from '../../../../utils/constants/navigationConstants';
import {GLOBAL_STYLES} from '../../../../utils/globalStyles';
import LoggedInHeader from '../../../../components/headers/LoggedInHeader';
import InputField from '../../../../components/InputField/InputField';
import {icons, images} from '../../../../utils/constants/assets';
import {STRING_CONSTANTS} from '../../../../utils/constants/stringConstants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../../utils/constants/colors';
import OuterHeader from '../../../../components/headers/OuterHeader';
import {darkTheme} from '../../../../utils/globalFunctions';
import {useDispatch} from 'react-redux';
import {object, string} from 'yup';
import {Formik} from 'formik';
import {showToast} from '../../../../libs/ToastConfig';
import {ToastType} from '../../../../components/toast/collection';
import {loginUser, testAPI} from '../../../../network/requests';
import {AppDispatch, RootState} from '../../../../redux/store/store';
import {
  reducer_user,
  setUserData,
  setTokenData,
} from '../../../../redux/slices/userslice';
import {keychainData} from '../../../../redux/localStorage/localStorage';
import {appConstants} from '../../../../utils/constants/appConstants';
import {TokenType} from '../../../../network/collection';
import {useSelector} from 'react-redux';

type intialState = {
  from: string | undefined;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
};

type props = {
  from?: string;
  submitTansaction: Function;
};

const SendEthForm = ({from, submitTansaction}: props) => {
  // *************************** Use SELECTOR ***************************
  const loader = useSelector<RootState>(state => state.ui.loader);

  // *************************** Use Theme ***************************
  const {colors} = useTheme();
  // *************************** Initial Values ***************************
  const initialState: intialState = {
    from: from,
    to: '',
    value: '',
    gas: '',
    gasPrice: '',
  };

  // *************************** REFS ***************************
  const fromRef = useRef<TextInput>(null);
  const toRef = useRef<TextInput>(null);
  const valueRef = useRef<TextInput>(null);
  const gasRef = useRef<TextInput>(null);
  const gasPriceRef = useRef<TextInput>(null);
  // *************************** Validation Schema ***************************
  const validationSchema = object().shape({
    to: string()
      .min(42, STRING_CONSTANTS.errors.addressInvalid)
      .max(42, STRING_CONSTANTS.errors.addressInvalid)
      .required(STRING_CONSTANTS.errors.addressInvalid),
    value: string()
      .min(1, STRING_CONSTANTS.errors.ethValue)
      .required(STRING_CONSTANTS.errors.ethValue),
    gas: string()
      .min(1, STRING_CONSTANTS.errors.ethGas)
      .required(STRING_CONSTANTS.errors.ethGas),
    gasPrice: string()
      .min(1, STRING_CONSTANTS.errors.ethGasPrice)
      .required(STRING_CONSTANTS.errors.ethGasPrice),
  });

  // *************************** Dispatch ***************************
  const dispatch = useDispatch<AppDispatch>();

  // *************************** UseEffects ***************************
  useEffect(() => {
    toRef?.current?.focus();
  }, []);
  // *************************** Functions ***************************
  const submitHandler = (values: any, setErrors: any, setTouched: any) => {
    console.log('VALUES:', values);
    submitTansaction(values);
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
            {/* *********************** from *********************** */}
            <InputField
              setFormValue={(value: string) => setFieldValue('from', value)}
              ref={fromRef}
              label={STRING_CONSTANTS.ethForm.from}
              placeholder={STRING_CONSTANTS.ethForm.address}
              onSubmitEditing={() => toRef?.current?.focus()}
              onTap={() => fromRef?.current?.focus()}
              fixedValue={from}
              disabled={true}
            />
            <View style={GLOBAL_STYLES.spacingView}></View>
            {/* *********************** to *********************** */}
            <InputField
              setFormValue={(value: string) => setFieldValue('to', value)}
              ref={toRef}
              label={STRING_CONSTANTS.ethForm.to}
              placeholder={STRING_CONSTANTS.ethForm.address}
              onSubmitEditing={() => valueRef?.current?.focus()}
              onTap={() => toRef?.current?.focus()}
            />
            {!errors.from && errors.to && touched.to
              ? showToast(errors.to, errors.to, ToastType.ERROR)
              : null}
            {!errors.from && touched.to && errors.to
              ? resetErrors(
                  setErrors,
                  setTouched,
                  setFieldTouched,
                  setFieldError,
                )
              : null}
            <View style={GLOBAL_STYLES.spacingView}></View>

            {/* *********************** Value *********************** */}
            <InputField
              setFormValue={(value: string) => setFieldValue('value', value)}
              ref={valueRef}
              label={STRING_CONSTANTS.ethForm.value}
              placeholder={STRING_CONSTANTS.ethForm.ether}
              onSubmitEditing={() => gasRef?.current?.focus()}
              onTap={() => valueRef?.current?.focus()}
            />
            {!errors.from && !errors.to && errors.value && touched.value
              ? showToast(errors.value, errors.value, ToastType.ERROR)
              : null}
            {!errors.from && !errors.to && errors.value && touched.value
              ? resetErrors(
                  setErrors,
                  setTouched,
                  setFieldTouched,
                  setFieldError,
                )
              : null}
            <View style={GLOBAL_STYLES.spacingView}></View>

            {/* *********************** Gas *********************** */}
            <InputField
              setFormValue={(value: string) => setFieldValue('gas', value)}
              ref={gasRef}
              label={STRING_CONSTANTS.ethForm.gas}
              placeholder={STRING_CONSTANTS.ethForm.gas}
              onSubmitEditing={() => gasPriceRef?.current?.focus()}
              onTap={() => gasRef?.current?.focus()}
            />
            {!errors.from &&
            !errors.to &&
            !errors.value &&
            errors.gas &&
            touched.gas
              ? showToast(errors.gas, errors.gas, ToastType.ERROR)
              : null}
            {!errors.from &&
            !errors.to &&
            !errors.value &&
            errors.gas &&
            touched.gas
              ? resetErrors(
                  setErrors,
                  setTouched,
                  setFieldTouched,
                  setFieldError,
                )
              : null}
            <View style={GLOBAL_STYLES.spacingView}></View>

            {/* *********************** Gas Price *********************** */}
            <InputField
              setFormValue={(value: string) => setFieldValue('gasPrice', value)}
              ref={gasPriceRef}
              label={STRING_CONSTANTS.ethForm.gasPrice}
              placeholder={STRING_CONSTANTS.ethForm.gasPrice}
              onSubmitEditing={() => handleSubmit()}
              onTap={() => gasPriceRef?.current?.focus()}
            />
            {!errors.from &&
            !errors.to &&
            !errors.value &&
            !errors.gas &&
            errors.gasPrice &&
            touched.gasPrice
              ? showToast(errors.gasPrice, errors.gasPrice, ToastType.ERROR)
              : null}
            {!errors.from &&
            !errors.to &&
            !errors.value &&
            !errors.gas &&
            errors.gasPrice &&
            touched.gasPrice
              ? resetErrors(
                  setErrors,
                  setTouched,
                  setFieldTouched,
                  setFieldError,
                )
              : null}
            <Pressable
              onPress={handleSubmit}
              style={[GLOBAL_STYLES.longButtonBlueStyle, {marginTop: 60}]}>
              {loader ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text style={[GLOBAL_STYLES.longButtonBlueTxtSt]}>Send</Text>
              )}
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SendEthForm;

const styles = StyleSheet.create({});
