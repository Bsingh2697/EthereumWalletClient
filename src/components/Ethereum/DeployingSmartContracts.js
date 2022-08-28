import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Web3 from 'web3';
import {infuraNetworkConstants} from '../../Infura/InfuraEndpoints';

const DeployingSmartContracts = () => {
  const web3 = new Web3(infuraNetworkConstants.base_url());

  const accountAddress = '0x28EFD95e52789B7365Ba36B94BE550760a7c5Ca3';
  const privateKey =
    '4783afb9825d9e02bcc6b8ed550d8f1355e0675656ce268be4796bfcdc65650f';

  const contractData =
    '0x608060405234801561001057600080fd5b506101f4806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063abc721061461003b578063e4ada89c14610059575b600080fd5b610043610075565b60405161005091906100f8565b60405180910390f35b610073600480360381019061006e91906100a9565b61007e565b005b60008054905090565b808261008a9190610113565b6000819055505050565b6000813590506100a3816101a7565b92915050565b600080604083850312156100c0576100bf6101a2565b5b60006100ce85828601610094565b92505060206100df85828601610094565b9150509250929050565b6100f281610169565b82525050565b600060208201905061010d60008301846100e9565b92915050565b600061011e82610169565b915061012983610169565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561015e5761015d610173565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600080fd5b6101b081610169565b81146101bb57600080fd5b5056fea26469706673582212209bff9292f8189dd9519f88f36e1e951766a43a62c650993d290e18babea47da464736f6c63430008070033';

  const addNUmberAbi = require('../../utils/smartContractABIs/AddNumber.json');

  const uploadSmartContract = () => {
    const txnObj = {
      gas: 1000000,
      gasPrice: web3.utils.toWei('10', 'gwei'),
      data: contractData,
    };

    const signTxn = web3.eth.accounts.signTransaction(
      txnObj,
      privateKey,
      (error, response) => {
        console.log('Error : ', error);
      },
    );

    signTxn.then(signedTxn => {
      const brodcastTxn = web3.eth.sendSignedTransaction(
        signedTxn.rawTransaction,
        (error, txnHash) => {
          console.log('Handled Error : ', error);
          console.log('Txn Hash : ', txnHash);
        },
      );

      brodcastTxn.on('receipt', receipt => {
        console.log('Receipt :', receipt);
      });

      brodcastTxn.on('Error', error => {
        console.log('Error handle :', error);
      });
    });
  };

  const abi = addNUmberAbi;
  const contractAddress = '0x87272751b73cEC9090Ab25BB1D01C01e7C9E5a85';

  const contract = new web3.eth.Contract(abi, contractAddress);

  const checkSmartContract = () => {
    console.log('Add number Contract Data :', contract);
  };

  const contractAddNumber = () => {
    // CALLING MY CONTRACT"S FUNCTION NOT WORKING
    contract.methods
      .addNum(5, 6)
      .send({from: accountAddress})
      .on('receipt', receipt => {
        console.log('REceipt Data :', receipt);
      })
      .on('confirmation', confirmation => {
        console.log('Confirmation Data :', confirmation);
      });
  };

  const contractSum = () => {
    contract.methods.returnSum().call((err, res) => {
      console.log('ERROR : SUM:', err);
      console.log('SUM:', res);
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={uploadSmartContract}>
        <Text>Upload Contract</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={checkSmartContract}>
        <Text>Check Contract</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={contractAddNumber}>
        <Text>Add Numbers in contract</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={contractSum}>
        <Text>Sum in contract</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeployingSmartContracts;

const styles = StyleSheet.create({});
