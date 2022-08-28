import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBAL_STYLES} from '../../../../utils/globalStyles';
import OuterHeader from '../../../../components/headers/OuterHeader';
import {icons} from '../../../../utils/constants/assets';
import {darkTheme} from '../../../../utils/globalFunctions';
import {SellNftProps, SendEthProp} from '../../../../navigation/types';
import {STRING_CONSTANTS} from '../../../../utils/constants/stringConstants';
import {COLORS} from '../../../../utils/constants/colors';
import SendInputField from '../../../../components/InputField/SendInputField';
import {useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../../../redux/store/store';
import {fetchPrivateKey} from '../../../../network/requests';
import PasswordInputModal from '../../../../components/Modal/PasswordInputModal/PasswordInputModal';
import {keychainData} from '../../../../redux/localStorage/localStorage';
import {setUserData} from '../../../../redux/slices/userslice';
import CryptoJS from 'react-native-crypto-js';
import Web3 from 'web3';
import {showToast} from '../../../../libs/ToastConfig';
import {hideLoader, showLoader} from '../../../../redux/slices/uiSlice';
import {
  ToastColorType,
  ToastType,
} from '../../../../components/toast/collection';
import {useSelector} from 'react-redux';
import {infuraNetworkConstants} from '../../../../Infura/InfuraEndpoints';
import SellNftForm from './SellNftForm';
import Config from 'react-native-config';
import {uploadJSONToIPFS} from '../../../../Pinata/PinataFunctions';

type sellNftData = {
  name: string;
  description: string;
  price: string;
  mintDate: string;
  image: string;
};

const SellNft = ({route, navigation}: SellNftProps) => {
  const MarketplaceAbi = require('../../../../utils/smartContractABIs/MarketplaceAbi.json');
  const MarketplaceAddress = Config.MARKETPLACE_CONTRACT_ADDRESS;

  // *************************** Constants ***************************
  const web3 = new Web3(infuraNetworkConstants.base_url());
  const contract = new web3.eth.Contract(MarketplaceAbi, MarketplaceAddress);
  const contractMethods = contract.methods;

  // *************************** Dispatch ***************************
  const dispatch = useDispatch<AppDispatch>();

  // *************************** Use State ***************************
  const [password, setpassword] = useState<string>();
  const [privateKey, setprivateKey] = useState<string>();
  const [loader, setloader] = useState<boolean>(false);
  // *************************** Use Effect ***************************
  useEffect(() => {
    setUserData();
  }, []);
  // ******************************** Setting User Address ********************************
  const setUserData = async () => {
    let user = await keychainData.getUserData();
    setpassword(user?.password);
  };

  const submitHandler = async (values: sellNftData) => {
    console.log('Data : : :', values);

    const uploadMetaDataToIpfs = await uploadJSONToIPFS(values);
    uploadMetaDataToIpfs.success == true
      ? (showToast(
          STRING_CONSTANTS.toast.uploadSuccessful,
          STRING_CONSTANTS.toast.uploadMetaDataToIpfsSuccessful,
          ToastType.SUCCESS,
        ),
        fetchUserKey(uploadMetaDataToIpfs.pinataURL, values))
      : uploadMetaDataToIpfs.pinataURL;
  };

  // ******************************** Get Private Key ********************************
  const fetchUserKey = (metadataUrl: string, data: sellNftData) => {
    dispatch(
      fetchPrivateKey(
        (response: any) => {
          console.log('Response End:', response?.data);
          let pk = CryptoJS.AES.decrypt(response.data.key, password!).toString(
            CryptoJS.enc.Utf8,
          );
          console.log('KEY VALUE : ', pk);
          pk ? listNFT(pk, metadataUrl, data) : null;
        },
        (error: any) => {
          console.log('Error End:', error);
        },
      ),
    );
  };

  const listNFT = async (
    pkey: string,
    metadataUrl: string,
    data: sellNftData,
  ) => {
    console.log('Private key of the user :', pkey);
    console.log('Meta data to submit on bloackchain :', metadataUrl);
    console.log('Data of NFT on bloackchain :', data);
    console.log('PRice of NFT on bloackchain :', data.price);

    let tokenData = contractMethods
      .createToken(metadataUrl, data?.price)
      .encodeABI();

    let listingPrice = await contractMethods
      .getListPrice()
      .call((err: any, response: any) => {
        if (err) {
          console.log(err);
        } else {
          return response;
        }
      });

    console.log('Listing Price  Rec: ', listingPrice);

    console.log('Listing Price : ', listingPrice);

    let txnObj = {};
    // *************************** Prepare Txn Object Try Catcher ***************************
    try {
      txnObj = {
        to: MarketplaceAddress,
        value: listingPrice, // Listing Price Fixed
        gas: 10000000,
        gasPrice: web3.utils.toWei('10', 'gwei'),
        data: tokenData,
      };
    } catch (err) {
      console.log('TxnObje ERRROR xxx: ', err);
    }

    // *************************** Sign Txn Try Catch ***************************
    try {
      console.log('TXN OBJECT : ', txnObj);
      console.log('Key TO sign : ', pkey);

      const signTxn = web3.eth.accounts.signTransaction(
        txnObj,
        pkey,
        (error, response) => {
          if (error) {
            console.log('Error Sign Transaction:', error);
          }
          if (response) {
            console.log('Response', response);
          }
        },
      );
      // *************************** Send Sign Txn Try Catch ***************************
      try {
        signTxn
          .then(signedTxn => {
            const broadcastTxn = web3.eth.sendSignedTransaction(
              signedTxn.rawTransaction!,
              (error, txnHash) => {
                if (error) {
                  error.toString() ==
                    STRING_CONSTANTS.toast.insufficientFundsMsg;
                  showToast(
                    STRING_CONSTANTS.toast.insufficientFunds,
                    STRING_CONSTANTS.toast.insufficientFundsMsg,
                    ToastType.ERROR,
                  );
                  console.log('Error Send Sign Transaction:', error);
                }
                if (txnHash) {
                  console.log('Send Signed TxnHash', txnHash);
                }
              },
            );

            broadcastTxn.on('receipt', receipt => {
              console.log('Receipt Receiver:', receipt);
              setloader(false);
              showToast(
                STRING_CONSTANTS.toast.uploadToMarketplace,
                STRING_CONSTANTS.toast.uploadToMarketplaceMsg,
                ToastType.SUCCESS,
              );
            });
            broadcastTxn.on('error', error => {
              console.log('Error handle :', error);
            });
            broadcastTxn.on('sent', sending => {
              console.log('sending Receiver:', sending);
              setloader(true);
            });
            broadcastTxn.on('sending', sending => {
              console.log('sending Receiver:', sending);
            });
            broadcastTxn.on('transactionHash', txnHash => {
              console.log('Txn Hash Receiver:', txnHash);
            });
          })
          .catch(error => {
            console.log('Error Signing Transaction :', error);
          });
      } catch (errors) {
        console.log('ERROR SSTTC: ', errors);
      }
    } catch (e) {
      console.error('Error STTC', e);
    }
  };

  return (
    <OuterHeader
      leftBackground={icons.encircle}
      leftIcon={icons.outerHeaderLogo}
      leftPress={() => console.log('Left Press')}
      rightBackground={icons.encircle}
      rightIcon={darkTheme() ? icons.cross_white : icons.cross}
      rightPress={() => navigation.goBack()}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.viewSt}>
        <Text
          style={[
            GLOBAL_STYLES.textPrimaryMedium24,
            GLOBAL_STYLES.textunderline,
            {
              letterSpacing: 1,
              color: darkTheme() ? COLORS.white : COLORS.heading_label_color,
            },
          ]}>
          Sell
        </Text>
        <View style={styles.inputView}>
          <SellNftForm submitTansaction={submitHandler} />
        </View>
      </ScrollView>
    </OuterHeader>
  );
};

export default SellNft;

const styles = StyleSheet.create({
  viewSt: {
    paddingHorizontal: 20,
    marginTop: 60,
    flexGrow: 1,
  },
  inputView: {
    marginTop: 40,
    marginBottom: 100,
  },
});
