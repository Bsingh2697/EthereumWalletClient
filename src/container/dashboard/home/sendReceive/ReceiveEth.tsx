import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBAL_STYLES} from '../../../../utils/globalStyles';
import OuterHeader from '../../../../components/headers/OuterHeader';
import {icons} from '../../../../utils/constants/assets';
import {darkTheme} from '../../../../utils/globalFunctions';
import {ReceiveEthProp, SendEthProp} from '../../../../navigation/types';
import {STRING_CONSTANTS} from '../../../../utils/constants/stringConstants';
import {COLORS} from '../../../../utils/constants/colors';
import SendInputField from '../../../../components/InputField/SendInputField';
import {useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../../../redux/store/store';
import {fetchPrivateKey} from '../../../../network/requests';
import PasswordInputModal from '../../../../components/Modal/PasswordInputModal/PasswordInputModal';
import {keychainData} from '../../../../redux/localStorage/localStorage';
import {setUserData} from '../../../../redux/slices/userslice';
import CryptoJS from 'react-native-crypto-js';
import SendEthForm from './SendEthForm';
import Web3 from 'web3';
import {showToast} from '../../../../libs/ToastConfig';
import {hideLoader, showLoader} from '../../../../redux/slices/uiSlice';
import {
  ToastColorType,
  ToastType,
} from '../../../../components/toast/collection';
import {useSelector} from 'react-redux';
import {infuraNetworkConstants} from '../../../../Infura/InfuraEndpoints';
import QRCode from 'react-qr-code';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';

const ReceiveEth = ({route, navigation}: ReceiveEthProp) => {
  // *************************** Use State ***************************
  const [address, setAddress] = useState<string>();
  // *************************** Use Effect ***************************
  useEffect(() => {
    setUserAddress();
  }, []);
  // ******************************** Setting User Address ********************************
  const setUserAddress = async () => {
    let user = await keychainData.getUserData();
    setAddress(user?.address);
  };

  return (
    <OuterHeader
      leftBackground={icons.encircle}
      leftIcon={icons.outerHeaderLogo}
      leftPress={() => console.log('Left Press')}
      rightBackground={icons.encircle}
      rightIcon={darkTheme() ? icons.cross_white : icons.cross}
      rightPress={() => navigation.goBack()}>
      <View style={styles.viewSt}>
        <Text
          style={[
            GLOBAL_STYLES.textPrimaryMedium24,
            GLOBAL_STYLES.textunderline,
            {
              letterSpacing: 1,
              color: darkTheme() ? COLORS.white : COLORS.heading_label_color,
            },
          ]}>
          Receive
        </Text>
        <View style={{alignItems: 'center', marginTop: 100}}>
          {address ? <QRCode size={190} value={address} /> : null}
          <Text style={[GLOBAL_STYLES.textPrimaryMedium10, {marginTop: 15}]}>
            Scan address to receive payment
          </Text>
          <LinearGradient
            style={styles.addressView}
            start={{x: 0.0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0.1, 0.6, 0.8]}
            colors={[
              'rgba(219, 0, 255,1)',
              'rgba(119,58,248,1)',
              'rgba(97, 0, 255,1)',
            ]}>
            <View style={{flex: 1}}>
              <Text
                style={[
                  GLOBAL_STYLES.textPrimaryMedium10,
                  {color: COLORS.white},
                ]}
                numberOfLines={1}>
                {address}
              </Text>
            </View>
            <TouchableOpacity
              style={{}}
              onPress={() => Clipboard.setString(address!)}>
              <Image source={icons.copy} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </OuterHeader>
  );
};

export default ReceiveEth;

const styles = StyleSheet.create({
  addressView: {
    width: 160,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 15,
  },
  viewSt: {
    paddingHorizontal: 20,
    marginTop: 60,
  },
});
