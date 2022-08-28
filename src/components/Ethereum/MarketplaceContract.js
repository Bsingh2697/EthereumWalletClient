import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const MarketplaceAbi = require('../../utils/smartContractABIs/MarketplaceAbi.json');
const MarketplaceAddress = Config.MARKETPLACE_CONTRACT_ADDRESS;

const MarketplaceContract = () => {
  const web3 = new Web3(`${Config.INFURA_GOERLI_NET_URL}${Config.INFURA_KEY}`);
  const contract = new web3.eth.Contract(MarketplaceAbi, MarketplaceAddress, {
    handleRevert: true,
  });
  const contractMethods = contract.methods;

  // Image URL
  const [imageUrl, setimageUrl] = useState();

  useEffect(() => {
    console.log('MarketplaceABi  :', MarketplaceAbi);
  }, []);

  // ****************************** Function ******************************
  const fetchAllNFTs = () => {
    console.log('ALL NFTS : :: : :');
    contractMethods?.getAllNFTs().call((err, res) => {
      console.log('NFTSSSS : ', res);
      console.log('Error : ', err);
    });
  };

  const fetchMyNFTs = () => {
    console.log('ALL NFTS : :: : :');
    contractMethods?.getMyNFTs().call((err, res) => {
      console.log('NFTSSSS : ', res);
      console.log('Error : ', err);
    });
  };

  const uploadNft = () => {
    let options = {
      cropping: false,
    };
    try {
      checkGalleryPermissions(
        () => {
          DocumentPicker.pickSingle({
            type: [DocumentPicker.types.allFiles],
          })
            .then(res => {
              console.log('RESPONSE UPLOADER:', res);

              RNFetchBlob.fs.stat(res.uri).then(async stats => {
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
                let uploadResp = await uploadFileToIPFS(finalData);
                console.log('Uploaded Image Data :', uploadResp);
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
          Linking.openSettings();
          console.log('Error Permission:', error);
        },
      );
    } catch (err) {
      console.log('ERROR Picker :', err);
    }
  };

  const listNFT = async () => {
    let uploadData = {
      name: 'Markus Corp',
      mintDate: new Date(),
      description: 'This is a markus corp NFT, creating digital assets',
      price: web3.utils.toWei('0.003', 'ether'),
      image: imageUrl,
    };
    const uploadResp = await uploadJSONToIPFS(uploadData);
    console.log('Uploaded NFT :', uploadResp);

    let privateKey =
      'd5cb81c82ecf391cf7372ad17eb3d984f312e8eedfa54ebdc10a943d8f1d9b6f';

    console.log('Txn222 UPLOAD DATA xxx: ', uploadData);

    // Preparing Data
    let data = contractMethods
      .createToken(uploadResp.pinataURL, web3.utils.toWei('0.01', 'ether'))
      .encodeABI();
    console.log('Txn222 xxx: ', data);
    // Creating Txn Data
    let txnObj;
    try {
      txnObj = {
        to: MarketplaceAddress,
        value: web3.utils.toWei('0.01', 'ether'),
        gas: 10000000,
        gasPrice: web3.utils.toWei('10', 'gwei'),
        data: data,
      };
    } catch (err) {
      // Idhar bhi toast daal
      console.log('TxnObje xxx: ', err);
    }
    console.log('Txn xxx: ', txnObj);
    try {
      const signTxn = web3.eth.accounts.signTransaction(
        txnObj,
        privateKey,
        (error, response) => {
          console.log('Handled xxx: ');
          console.log('Error Signing: ', error);
        },
      );
      try {
        signTxn
          .then(signedTxn => {
            console.log('Handled xxx: ');
            const brodcastTxn = web3.eth.sendSignedTransaction(
              signedTxn.rawTransaction,
              (error, txnHash) => {
                console.log('Handled xxx: ');
                console.log('Handled Error : ', error);
                console.log('Txn Hash : ', txnHash);
              },
            );

            brodcastTxn.on('receipt', receipt => {
              console.log('Receipt :', receipt);
            });
            brodcastTxn.on('error', error => {
              console.log('Error handle :', error);
            });
            brodcastTxn.on('sent', sending => {
              console.log('sending Receiver:', sending);
            });
            brodcastTxn.on('sending', sending => {
              console.log('sending Receiver:', sending);
            });
          })
          .catch(error => {
            console.log('Error Signing Transaction :', error);
          });
      } catch (errors) {
        console.log('ERROR : ', errors);
      }
    } catch (e) {
      console.error('Error', e);
    }
  };

  const buyNFT = async () => {
    let privateKey =
      '5ca4c3ae47f2d300559c1fe240010b7df0c1af9f7117e36fef8d3975cb0eacca';

    let {price, tokenId} = await contractMethods
      .getListedForTokenId(7)
      .call((err, res) => {
        console.log('PRICEEEE  RESS: ', res);
      });
    console.log('PRICEEEE : ', price);

    let data = contractMethods.executeSale(tokenId).encodeABI();
    let txnObj;
    try {
      txnObj = {
        to: MarketplaceAddress,
        value: price,
        gas: 10000000,
        gasPrice: web3.utils.toWei('10', 'gwei'),
        data: data,
      };
    } catch (err) {
      // Idhar bhi toast daal
      console.log('TxnObje xxx: ', err);
    }
    try {
      const signTxn = web3.eth.accounts.signTransaction(
        txnObj,
        privateKey,
        (error, response) => {
          console.log('Handled xxx: ');
          console.log('Error Signing: ', error);
        },
      );
      try {
        signTxn
          .then(signedTxn => {
            console.log('Handled xxx: ');
            const brodcastTxn = web3.eth.sendSignedTransaction(
              signedTxn.rawTransaction,
              (error, txnHash) => {
                console.log('Handled xxx: ');
                console.log('Handled Error : ', error);
                console.log('Txn Hash : ', txnHash);
              },
            );
            brodcastTxn.on('error', error => {
              console.log('error :', error);
            });
            brodcastTxn.on('confirmation', receipt => {
              console.log('confirmation :', receipt);
            });
            brodcastTxn.on('receipt', receipt => {
              console.log('Receipt :', receipt);
            });
            brodcastTxn.on('sent', sending => {
              console.log('sending Receiver:', sending);
            });
            brodcastTxn.on('sending', sending => {
              console.log('sending Receiver:', sending);
            });
          })
          .catch(error => {
            console.log('Error Signing Transaction :', error);
          });
      } catch (errors) {
        console.log('ERROR : ', errors);
      }
    } catch (e) {
      console.error('Error', e);
    }
  };

  return (
    <View>
      <Text>MarketplaceContract</Text>
      <TouchableOpacity style={styles.btnStyle} onPress={() => fetchAllNFTs()}>
        <Text style={{color: 'white'}}> All NFTs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStyle} onPress={() => fetchMyNFTs()}>
        <Text style={{color: 'white'}}> My NFTs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStyle} onPress={() => uploadNft()}>
        <Text style={{color: 'white'}}> Upload NFTs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStyle} onPress={() => listNFT()}>
        <Text style={{color: 'white'}}> List NFTs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStyle} onPress={() => buyNFT()}>
        <Text style={{color: 'white'}}> Buy NFTs</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.btnStyle} onPress={() => {}}>
        <Text style={{color: 'white'}}> Fetch NFT Data</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default MarketplaceContract;

const styles = StyleSheet.create({
  btnStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    backgroundColor: 'blue',
  },
});
