import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Web3 from 'web3';
import {web3networkConstants} from '../../utils/constants/web3networkConstants';

const SigningTransaction = () => {
  const web3 = new Web3(web3networkConstants.base_url);

  const address1 = '0x034F3ABf8c534C1D4020b422a7582e78253C7758'; //Chrome
  const address2 = '0x28EFD95e52789B7365Ba36B94BE550760a7c5Ca3'; // Morzilla

  const privateKey1 =
    'b27fe0e42a005c6b6ec7f75b3efc4c592eb50d4b839e10b6a8c99f63c10ce115'; // Chrome
  const privateKey2 =
    '4783afb9825d9e02bcc6b8ed550d8f1355e0675656ce268be4796bfcdc65650f'; // Morzilla

  const signTransaction = () => {
    // Create transaction object
    let tobj = {
      // Nonce is not required anymore, it is automatically equals to web3.eth.transactionCount()
      to: address2,
      value: web3.utils.toWei('0.2', 'ether'),
      gas: '21000', // Earlier gas was gasLimit
      gasPrice: web3.utils.toWei('10', 'gwei'),
    };

    // Signing Transaction
    const signedTransaction = web3.eth.accounts.signTransaction(
      tobj,
      privateKey1,
    );

    // Broadcasting Transaction
    signedTransaction.then(signedTx => {
      const broadcastTxn = web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );

      broadcastTxn.on('receipt', receipt => {
        console.log('Receipt :', receipt);
      });

      broadcastTxn.on('error', err => {
        console.log('Error Receiver:', err);
      });
    });
  };

  const checkBalance = () => {
    // console.log(web3);

    web3.eth.getBalance(address1, (err, res) => {
      console.log('Balance Account 1: ', web3.utils.fromWei(res, 'ether'));
    });
    web3.eth.getBalance(address2, (err, res) => {
      console.log('Balance: Account 2: ', web3.utils.fromWei(res, 'ether'));
    });
  };
  return (
    <View>
      <TouchableOpacity onPress={() => signTransaction()}>
        <Text>Sign Transaction</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => checkBalance()}>
        <Text>Get Balance</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SigningTransaction;

const styles = StyleSheet.create({});
