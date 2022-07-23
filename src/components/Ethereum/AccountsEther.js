import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Web3 from 'web3';
import {web3networkConstants} from '../../utils/constants/web3networkConstants';

const Ether = () => {
  const web3 = new Web3(web3networkConstants.base_url);

  const test = () => {
    console.log('Testing');
    const newWallet = web3.eth.accounts.wallet.create(1);
    const newAccount = newWallet[0];
    console.log(newAccount);
  };

  const checkAddress = () => {
    console.log('Testing 2');

    const web3 = new Web3(web3networkConstants.base_url);

    let res = web3.utils.isAddress(
      '0xa6e69b2ea9802e47407154eda74fa3d515eba5a1',
    );
    console.log(res);

    console.log(web3.eth);

    web3.eth
      .getTransactionCount('0xA7E4EF0a9e15bDEf215E2ed87AE050f974ECD60b')
      .then(val => console.log('Count', val));

    web3.eth
      .getBalance('0xa6e69b2ea9802e47407154eda74fa3d515eba5a1')
      .then(val => console.log('Balance', val));
  };

  const sendTransation = () => {
    let tranObj = {
      from: '0xa6e69b2ea9802e47407154eda74fa3d515eba5a1',
      to: '0x5a1576768Bb9DE3aD1ad59A4065b10EB928DAFae',
    };
    web3.eth.sendTransaction(tranObj, res => {
      console.log('Transation response', res);
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => test()}>
        <Text>Create-Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => checkAddress()}>
        <Text>Check-address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ether;

const styles = StyleSheet.create({});
