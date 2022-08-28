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
  Image,
  Linking,
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
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {
  uploadFileToIPFS,
  uploadJSONToIPFS,
} from '../../../../Pinata/PinataFunctions';
import {checkGalleryPermissions} from '../../../../libs/permissionUtils';
import {number} from 'yup/lib/locale';
import Config from 'react-native-config';
import Web3 from 'web3';

type intialState = {
  name: string;
  description: string;
  price: string;
};

type props = {
  submitTansaction: Function;
};

const SellNftForm = ({submitTansaction}: props) => {
  const web3 = new Web3(`${Config.INFURA_GOERLI_NET_URL}${Config.INFURA_KEY}`);
  // *************************** Use SELECTOR ***************************
  const loader = useSelector<RootState>(state => state.ui.loader);

  // *************************** Use SELECTOR ***************************
  const [nftUrl, setnftUrl] = useState<string>(); // FROM DEVICE
  const [imageUrl, setimageUrl] = useState<string>(); // FROM PINATA

  // *************************** Initial Values ***************************
  const initialState: intialState = {
    name: '',
    description: '',
    price: '',
  };

  // *************************** REFS ***************************
  const nameRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);

  // *************************** Validation Schema ***************************
  const validationSchema = object().shape({
    name: string()
      .min(1, STRING_CONSTANTS.errors.nameRequiredmsg)
      .max(24, STRING_CONSTANTS.errors.nameRequiredmsglong)
      .required(STRING_CONSTANTS.errors.nameRequiredmsg),
    description: string()
      .min(1, STRING_CONSTANTS.errors.descriptionNftmsg)
      .max(400, STRING_CONSTANTS.errors.descriptionNftmsglong)
      .required(STRING_CONSTANTS.errors.descriptionNftmsg),
    price: string()
      .min(1, STRING_CONSTANTS.errors.priceRequiredmsg)
      .required(STRING_CONSTANTS.errors.priceRequiredmsg),
  });
  // *************************** Dispatch ***************************
  const dispatch = useDispatch<AppDispatch>();

  // *************************** UseEffects ***************************
  useEffect(() => {
    nameRef?.current?.focus();
  }, []);
  // *************************** Functions ***************************
  const submitHandler = (values: any, setErrors: any, setTouched: any) => {
    console.log('VALUES:', values);

    let formValues = {...values};
    delete formValues.price;
    console.log('Form VALUES:', formValues);
    let nftPrice = `${values.price}`;
    console.log('CHeck price:', nftPrice);

    let data;
    if (imageUrl) {
      try {
        data = {
          ...values,
          price: `${web3.utils.toWei(`${values.price}`, 'ether')}`,
          image: imageUrl,
          mintDate: new Date().toLocaleDateString(),
        };
      } catch (err) {
        console.log('Error: ', err);
      }
      submitTansaction(data);
      setErrors({});
      setTouched({});
    } else {
      showToast(
        STRING_CONSTANTS.errors.nftRequired,
        STRING_CONSTANTS.errors.nftRequiredMsg,
        ToastType.ERROR,
      );
      return;
    }
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

  const uploadNft = () => {
    let options = {
      cropping: false,
    };
    try {
      checkGalleryPermissions(
        () => {
          DocumentPicker.pickSingle({
            type: [DocumentPicker.types.allFiles],
          })
            .then(res => {
              console.log('RESPONSE UPLOADER:', res);

              RNFetchBlob.fs
                .stat(res.uri)
                .then(async stats => {
                  console.log('STATS : ', stats);
                  let str1 = 'file://';
                  let str2 = stats.path;
                  let correctpath = str1.concat(str2);
                  setnftUrl(correctpath);
                  let finalData = {
                    uri: correctpath,
                    type: res.type,
                    name: res.name,
                    lastModified: stats.lastModified,
                    size: stats.size,
                  };
                  console.log('FINAL DATA:', finalData);
                  showToast(
                    STRING_CONSTANTS.toast.uploadStarted,
                    STRING_CONSTANTS.toast.uploadStartedmsg,
                    ToastType.SUCCESS,
                  );
                  let uploadResp = await uploadFileToIPFS(finalData);
                  console.log('Uploaded Image Data :', uploadResp);
                  uploadResp.success == true
                    ? (setimageUrl(uploadResp.pinataURL),
                      showToast(
                        STRING_CONSTANTS.toast.uploadSuccessful,
                        STRING_CONSTANTS.toast.uploadSuccessfulMsg,
                        ToastType.SUCCESS,
                      ))
                    : uploadResp.pinataURL;
                })
                .catch((err: any) => {
                  console.log('Picker Error : ', err);
                });
            })
            .catch(err => {
              if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
              } else {
                console.log('ERROR', err);
                throw err;
              }
            });
        },
        (error: any) => {
          Linking.openSettings();
          console.log('Error Permission:', error);
        },
      );
    } catch (err) {
      console.log('ERROR Picker :', err);
    }
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
            {/* *********************** Name *********************** */}
            <InputField
              setFormValue={(value: string) => setFieldValue('name', value)}
              ref={nameRef}
              label={STRING_CONSTANTS.sellNft.name}
              placeholder={STRING_CONSTANTS.sellNft.name}
              onSubmitEditing={() => priceRef?.current?.focus()}
              onTap={() => nameRef?.current?.focus()}
            />
            {errors.name && touched.name
              ? showToast(
                  STRING_CONSTANTS.errors.fieldInvalid,
                  errors.name,
                  ToastType.ERROR,
                )
              : null}
            {errors.name && touched.name
              ? resetErrors(
                  setErrors,
                  setTouched,
                  setFieldTouched,
                  setFieldError,
                )
              : null}
            <View style={GLOBAL_STYLES.spacingView}></View>

            {/* *********************** Price *********************** */}

            <InputField
              setFormValue={(value: string) => setFieldValue('price', value)}
              ref={priceRef}
              label={STRING_CONSTANTS.sellNft.price}
              placeholder={STRING_CONSTANTS.sellNft.ether}
              onSubmitEditing={() => descriptionRef?.current?.focus()}
              onTap={() => priceRef?.current?.focus()}
            />
            {!errors.name && errors.price && touched.price
              ? showToast(
                  STRING_CONSTANTS.errors.fieldInvalid,
                  errors.price,
                  ToastType.ERROR,
                )
              : null}
            {!errors.name && touched.price && errors.price
              ? resetErrors(
                  setErrors,
                  setTouched,
                  setFieldTouched,
                  setFieldError,
                )
              : null}
            <View style={GLOBAL_STYLES.spacingView}></View>

            {/* *********************** Description *********************** */}
            <InputField
              setFormValue={(value: string) =>
                setFieldValue('description', value)
              }
              ref={descriptionRef}
              label={STRING_CONSTANTS.sellNft.description}
              placeholder={STRING_CONSTANTS.sellNft.description}
              onSubmitEditing={() => handleSubmit()}
              onTap={() => descriptionRef?.current?.focus()}
            />
            {!errors.name &&
            !errors.price &&
            errors.description &&
            touched.description
              ? showToast(
                  STRING_CONSTANTS.errors.fieldInvalid,
                  errors.description,
                  ToastType.ERROR,
                )
              : null}
            {!errors.name &&
            !errors.price &&
            errors.description &&
            touched.description
              ? resetErrors(
                  setErrors,
                  setTouched,
                  setFieldTouched,
                  setFieldError,
                )
              : null}
            {nftUrl ? (
              <View
                style={{
                  marginTop: 20,
                }}>
                <Image
                  style={{height: 100, width: 100}}
                  source={{uri: nftUrl}}
                />
              </View>
            ) : null}
            <TouchableOpacity
              style={[GLOBAL_STYLES.smallButton, styles.btnStyle]}
              onPress={() => uploadNft()}>
              <Text
                style={[
                  GLOBAL_STYLES.textPrimaryBold11,
                  {color: COLORS.white},
                ]}>
                {' '}
                Upload NFTs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[GLOBAL_STYLES.longButtonBlueStyle, {marginTop: 60}]}>
              {loader ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text style={[GLOBAL_STYLES.longButtonBlueTxtSt]}>
                  List NFT
                </Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SellNftForm;

const styles = StyleSheet.create({
  btnStyle: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    marginTop: 20,
  },
});
