import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import {keychainData} from '../../../redux/localStorage/localStorage';
import {alpha_black, COLORS} from '../../../utils/constants/colors';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';

type props = {
  visible: boolean;
  onClose: Function;
  onSubmit: Function;
};

const PasswordInputModal = ({visible, onClose, onSubmit}: props) => {
  const [password, setpassword] = useState<string>();

  const handlePasswordSubmit = async () => {
    let user = await keychainData.getUserData();
    // console.log('USER: ', user);

    if (user?.password == password) {
      onSubmit(true);
      setpassword('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[GLOBAL_STYLES.textPrimaryMedium14]}>
            Enter Password
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
            <TextInput
              style={[GLOBAL_STYLES.textPrimaryRegular12, styles.inputSt]}
              value={password}
              onChangeText={password => setpassword(password)}
              placeholder="Enter Password"
            />
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => handlePasswordSubmit()}>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryRegular12,
                {color: COLORS.white},
              ]}>
              Confirm
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default PasswordInputModal;

const styles = StyleSheet.create({
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
    backgroundColor: alpha_black(0.9),
  },
  modalView: {
    marginHorizontal: 60,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: COLORS.btn_blue,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
