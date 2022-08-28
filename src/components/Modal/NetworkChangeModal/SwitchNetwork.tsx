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
} from 'react-native';
import {useDispatch} from 'react-redux';
import {keychainData} from '../../../redux/localStorage/localStorage';
import {NETWORK, updateNetwork} from '../../../redux/slices/networkSlice';
import {AppDispatch} from '../../../redux/store/store';
import {icons} from '../../../utils/constants/assets';
import {alpha_black, COLORS} from '../../../utils/constants/colors';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';

type props = {
  visible: boolean;
  onClose: Function;
  onSubmit: Function;
};

const SwitchNetwork = ({visible, onClose, onSubmit}: props) => {
  const dispatch = useDispatch<AppDispatch>();

  const updateHandle = (nwrk: NETWORK) => {
    switch (nwrk) {
      case NETWORK.MAIN_NET:
        dispatch(updateNetwork(NETWORK.MAIN_NET));
        onClose();
        return;
      case NETWORK.GOERLI_NET:
        dispatch(updateNetwork(NETWORK.GOERLI_NET));
        onClose();
        return;
      default:
        dispatch(updateNetwork(NETWORK.MAIN_NET));
        onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}>
      <Pressable onPress={() => onClose()} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.headingSt]}>
            <View style={styles.flexOne}></View>
            <View style={[{alignItems: 'center', flex: 5}]}>
              <Text
                style={[
                  GLOBAL_STYLES.textPrimaryMedium17,
                  {
                    color: COLORS.gray_shade_two,
                    includeFontPadding: false,
                    textAlignVertical: 'center',
                  },
                ]}>
                Networks
              </Text>
            </View>
            <Pressable
              onPress={() => onClose()}
              style={[
                styles.flexOne,
                {
                  alignItems: 'flex-end',
                },
              ]}>
              <Image source={icons.netcross} />
            </Pressable>
          </View>
          <View style={styles.dividerView}>
            <View style={styles.divider}></View>
          </View>
          {/* MAIN NETWORK */}
          <Pressable
            onPress={() => updateHandle(NETWORK.MAIN_NET)}
            style={[styles.ntwrkViewSt]}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={icons.ethnetlogo} />
            </View>
            <View style={{flex: 12, paddingStart: 15}}>
              <Text
                style={[
                  GLOBAL_STYLES.textPrimaryMedium14,
                  {includeFontPadding: false, color: COLORS.gray_shade_two},
                ]}>
                Ethereum Main Network
              </Text>
            </View>
          </Pressable>
          {/* GOERLI NETWORK */}
          <Pressable
            onPress={() => updateHandle(NETWORK.GOERLI_NET)}
            style={[styles.ntwrkViewSt]}>
            <View style={{flex: 1}}>
              <View style={styles.netLogoView}>
                <Text
                  style={[
                    GLOBAL_STYLES.textSecondaryMedium10,
                    {color: COLORS.white},
                  ]}>
                  G
                </Text>
              </View>
            </View>
            <View style={{flex: 12, paddingStart: 15}}>
              <Text
                style={[
                  GLOBAL_STYLES.textPrimaryMedium14,
                  {includeFontPadding: false, color: COLORS.gray_shade_two},
                ]}>
                Goerli Test Network
              </Text>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default SwitchNetwork;

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
    backgroundColor: alpha_black(0.7),
  },
  modalView: {
    marginHorizontal: 60,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 15,
    alignItems: 'center',
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
