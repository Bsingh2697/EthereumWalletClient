import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Web3 from 'web3';
import {web3networkConstants} from '../../utils/constants/web3networkConstants';

const BinanceAbi = require('../../utils/smartContractABIs/BinanceChainMainnetSwap.json');
const BinanceAddress = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52';

// TALKING TO CONTRACTS IN SOLIDITY
const ContractsEther = () => {
  const web3 = new Web3(web3networkConstants.base_url);

  const contract = new web3.eth.Contract(BinanceAbi, BinanceAddress);

  const contractData = () => {
    console.log('Contract Data :', contract);
  };

  const contractDataMethods = () => {
    console.log('Contract Data MEthods :', contract.methods);
  };

  const contractDataMethodsCall = () => {
    console.log(
      'Method Call :',
      contract.methods.name().call((err, res) => {
        console.log('Error : ', err);
        console.log('Name : ', res);
      }),
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => contractData()}>
        <Text>Contract Data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => contractDataMethods()}>
        <Text>Contract Data Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => contractDataMethodsCall()}>
        <Text>Contract Method call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContractsEther;

const styles = StyleSheet.create({});
