import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {
  addUserAccount,
  removeUserData,
  setUserData,
  updateUserData,
  user,
} from '../../redux/slices/userslice';
import {storageInstance} from '../../redux/localStorage/localStorage';
import * as Keychain from 'react-native-keychain';

const OnBoarding = () => {
  const userData = useAppSelector(state => state.user.user_data);
  const dispatch = useAppDispatch();

  const tempData: user = {
    privatekeys: ['123'],
    password: 'ttre',
    username: 'Bharat',
  };
  const tempDataTwo: string = '345';

  // ********************* REDUX ****************************
  const setData = () => {
    dispatch(setUserData(tempData));
  };
  const getData = () => {
    console.error('USER DATA: ', userData);
  };
  const removeData = () => {
    dispatch(removeUserData());
  };
  const updateData = () => {
    dispatch(addUserAccount(tempDataTwo));
  };

  // ********************* STORAGE DATA *********************
  const [storageData, setstorageData] = useState<user>();

  const storeInLocalStorage = () => {
    storageInstance.set('user', JSON.stringify(userData));
  };
  const updateInLocalStorage = () => {
    const tempDataTwo: user = {
      privatekeys: ['123', '456', '789'],
      password: 'ttre',
      username: 'Bharat',
    };
    storageInstance.set('user', JSON.stringify(tempDataTwo));
  };
  const getFromLocalStorage = () => {
    let data = storageInstance.getString('user');
    console.log('DATA STRINGIFIED: ', data ? JSON.parse(data) : null);
    data ? setstorageData(JSON.parse(data)) : null;
  };
  const removeFromLocalStorage = () => {
    storageInstance.clearAll();
    setstorageData({password: '', username: '', privatekeys: []});
  };

  // ********************* KEYCHAIN DATA *********************

  const storeKCdata = async () => {
    const username = {username: 'Bharat', keys: ['asd12', 'asdd123']};
    const password = 'Test1234';
    // Store the credentials
    await Keychain.setGenericPassword(JSON.stringify(username), password);
  };
  const getKCdata = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        let user = JSON.parse(credentials.username);
        console.log(
          'Credentials successfully loaded for user ' +
            user.username +
            ' --- ' +
            user?.keys[0] +
            ' --- ' +
            credentials.password,
        );
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };
  const clearKCdata = async () => {
    await Keychain.resetGenericPassword();
  };

  return (
    <View>
      <Text style={styles.txtColor}>
        ****************** REDUX ******************
      </Text>
      <TouchableOpacity onPress={() => setData()} style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>SET DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => getData()} style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>GET DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => updateData()}
        style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>Update DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => removeData()}
        style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>REMOVE DATA</Text>
      </TouchableOpacity>
      <Text style={styles.txtColor}>
        {userData?.password}
        {'=>'}
        {userData?.username}
      </Text>
      <FlatList
        data={userData?.privatekeys}
        renderItem={({item}) => <Text style={styles.txtColor}>{item}</Text>}
      />
      <Text style={styles.txtColor}>
        ****************** Local Storage ******************
      </Text>
      <TouchableOpacity
        onPress={() => storeInLocalStorage()}
        style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>SET STORAGE DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => getFromLocalStorage()}
        style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>GET STORAGE DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => updateInLocalStorage()}
        style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>Update STORAGE DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => removeFromLocalStorage()}
        style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>REMOVE STORAGE DATA</Text>
      </TouchableOpacity>
      <Text style={styles.txtColor}>
        {storageData?.password}
        {'=>'}
        {storageData?.username}
      </Text>
      <FlatList
        data={storageData?.privatekeys}
        renderItem={({item}) => <Text>{item}</Text>}
      />
      <Text style={styles.txtColor}>
        ****************** Keychain Storage ******************
      </Text>
      <TouchableOpacity
        onPress={() => storeKCdata()}
        style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>SET KC DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => getKCdata()}
        style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>GET KC DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => clearKCdata()}
        style={{marginVertical: 20}}>
        <Text style={styles.txtColor}>Clear KC DATA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  txtColor: {
    color: 'black',
  },
});
