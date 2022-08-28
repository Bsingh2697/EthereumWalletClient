import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Web3 from 'web3';
import {infuraNetworkConstants} from '../../Infura/InfuraEndpoints';
import Config from 'react-native-config';
import {_bytecode} from '../../utils/smartContractByteCode/ByteCode';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {checkGalleryPermissions} from '../../libs/permissionUtils';
import {uploadFileToIPFS, uploadJSONToIPFS} from '../../Pinata/PinataFunctions';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

const TokenAbi = require('../../utils/smartContractABIs/TokenABI.json');
const TokenAddress = '0x4eaf4f4f02dc23399c6216a01949f50f93f657da';

const TokenContract = () => {
  // const web3 = new Web3(`${Config.INFURA_MAIN_NET_URL}${Config.INFURA_KEY}`);
  const web3 = new Web3(`${Config.INFURA_GOERLI_NET_URL}${Config.INFURA_KEY}`);
  const contract = new web3.eth.Contract(TokenAbi, TokenAddress);
  const cmethods = contract.methods;

  const [imageUrl, setimageUrl] = useState();
  const contractData = () => {
    console.log('Contract Data Called:');
    console.log(
      'Contract Data :',
      cmethods?.totalSupply().call((err, res) => {
        console.log('Error : ', err);
        console.log('Name : ', res);
      }),
    );
  };

  const transferToken = () => {
    // method params
    let params = {
      to: '0xb310Ed6A4faE3b3E29f1dEAf3685A1f0c0EF4ED3', // CHrome address
      amount: 9999,
    };
    // method abi
    let data = cmethods.transfer(params.to, params.amount).encodeABI();

    // Creating txn object
    const txnObj = {
      to: '0x4eaf4F4f02dC23399c6216A01949f50F93F657da', // Contract Address
      gas: 10000000,
      gasPrice: web3.utils.toWei('10', 'gwei'),
      data: data,
    };

    let privateKey =
      'd5cb81c82ecf391cf7372ad17eb3d984f312e8eedfa54ebdc10a943d8f1d9b6f'; // Morzilla privateKey
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

  const balanceCheck = () => {
    console.log('Balance CHeck MEthod');

    cmethods
      ?.balanceOf('0x0f37cfD41812e86797f8b1CB1986Ea9AaC38AC50')
      .call((err, res) => {
        console.log('Error USer 1 : ', err);
        console.log('Name  USer 1: ', res);
      });
    cmethods
      ?.balanceOf('0xb310Ed6A4faE3b3E29f1dEAf3685A1f0c0EF4ED3')
      .call((err, res) => {
        console.log('Error USer 2 : ', err);
        console.log('Name  USer 2: ', res);
      });
  };

  const handleUpload = async () => {
    let options = {
      cropping: false,
      includeBase64: true,
    };
    try {
      checkGalleryPermissions(
        () => {
          DocumentPicker.pickSingle({
            type: [DocumentPicker.types.allFiles],
          })
            .then(res => {
              console.log('RESPONSE UPLOADER:', res);

              RNFetchBlob.fs.stat(res.uri).then(stats => {
                console.log('STATS : ', stats);
                let str1 = 'file://';
                let str2 = stats.path;
                let correctpath = str1.concat(str2);
                let finalData = {
                  uri: correctpath,
                  type: res.type,
                  name: res.name,
                  lastModified: stats.lastModified,
                  size: stats.size,
                };
                console.log('FINAL DATA:', finalData);
                let uploadResp = uploadFileToIPFS(finalData);
                setimageUrl(uploadResp.pinataURL);
              });
            })
            .catch(err => {
              if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
              } else {
                console.log('ERROR', err);
                throw err;
              }
            });
        },
        error => {
          console.log('Error Permission:', error);
        },
      );
    } catch (err) {
      console.log('ERROR Picker :', err);
    }
  };

  const handleListing = () => {
    console.log('PINATA IMAGE URL : ', imageUrl);

    let data = {
      name: 'Test',
      description: 'Testing Description',
      price: 0.000005,
      image: imageUrl,
    };

    console.log('DATA : :', data);

    uploadJSONToIPFS(data);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 200,
        paddingBottom: 200,
        backgroundColor: 'white',
      }}>
      <TouchableOpacity onPress={() => contractData()}>
        <Text>Contract Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{paddingVertical: 50, marginVertical: 50}}
        onPress={() => transferToken()}>
        <Text>Transfer TOkens from morz to chr</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => balanceCheck()}>
        <Text>Contract Balance Check </Text>
      </TouchableOpacity>
      {/* ALL NFTs */}
      <TouchableOpacity style={{paddingVertical: 50, marginVertical: 50}}>
        <Text>All NFTs</Text>
      </TouchableOpacity>
      {/* My NFTs */}
      <TouchableOpacity>
        <Text>My NFTs</Text>
      </TouchableOpacity>
      {/* Upload NFT NFTs */}
      <TouchableOpacity
        onPress={() => handleUpload()}
        style={{paddingVertical: 50, marginVertical: 50}}>
        <Text>Upload NFTs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleListing()}>
        <Text>List NFT to marketplace</Text>
      </TouchableOpacity>
      {/* Buy NFTs */}
      <TouchableOpacity style={{paddingVertical: 50, marginVertical: 50}}>
        <Text>Buy NFTs</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TokenContract;

const styles = StyleSheet.create({});
