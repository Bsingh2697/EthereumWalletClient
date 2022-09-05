import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
  useWindowDimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {keychainData} from '../../../redux/localStorage/localStorage';
import {NETWORK, updateNetwork} from '../../../redux/slices/networkSlice';
import {AppDispatch} from '../../../redux/store/store';
import {icons} from '../../../utils/constants/assets';
import {alpha_black, COLORS} from '../../../utils/constants/colors';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';
import LottieView from 'lottie-react-native';

type props = {
  visible: boolean;
  message: string;
};

const TransactionSuccessful = ({visible, message}: props) => {
  const {width, height} = useWindowDimensions();
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <LottieView
            source={{
              uri: 'https://assets7.lottiefiles.com/packages/lf20_ppwu5qi1.json',
            }}
            autoPlay
            loop={false}
            style={{height: height, width: width}}
          />
          <View
            style={{zIndex: 1000, position: 'absolute', flexDirection: 'row'}}>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryMedium18,
                {color: COLORS.white, letterSpacing: 1, textAlign: 'center'},
              ]}>
              {message} 🎉
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TransactionSuccessful;

const styles = StyleSheet.create({
  netLogoView: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: COLORS.goerli,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ntwrkViewSt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
  },
  dividerView: {
    flexDirection: 'row',
  },
  divider: {
    height: 1,
    flex: 1,
    backgroundColor: COLORS.black_overlay_min,
    marginTop: 10,
    marginBottom: 24,
  },
  headingSt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
  },
  flexOne: {
    flex: 1,
  },
  emptySpace: {},
  inputSt: {
    borderWidth: 0.2,
    flex: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    color: COLORS.gray_shade_two,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: alpha_black(0.8),
  },
  modalView: {
    marginHorizontal: 60,
    // backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 0,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },
});
