import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  BackHandler,
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
  const [error, seterror] = useState(false);

  useEffect(() => {
    const backAction = () => {
      seterror(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handlePasswordSubmit = async () => {
    let user = await keychainData.getUserData();
    // console.log('USER: ', user);

    if (user?.password == password) {
      onSubmit(true);
      setpassword('');
    } else {
      seterror(true);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => (onClose(), seterror(false))}>
      <TouchableOpacity
        onPress={() => (onClose(), seterror(false))}
        style={styles.centeredView}>
        <Pressable style={styles.modalView}>
          <Text style={[GLOBAL_STYLES.textPrimaryMedium14]}>
            Enter Password
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TextInput
              style={[GLOBAL_STYLES.textPrimaryRegular12, styles.inputSt]}
              value={password}
              onChangeText={password => (
                setpassword(password), seterror(false)
              )}
              placeholder="Enter Password"
            />
          </View>
          {error ? (
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryRegular12,
                {
                  color: COLORS.red,
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  marginTop: 3,
                },
              ]}>
              Invalid Password!
            </Text>
          ) : null}
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => handlePasswordSubmit()}>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryRegular12,
                {color: COLORS.white},
              ]}>
              Confirm
            </Text>
          </TouchableOpacity>
        </Pressable>
      </TouchableOpacity>
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
    zIndex: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
    elevation: 2,
    marginTop: 20,
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
