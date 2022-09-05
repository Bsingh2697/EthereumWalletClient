import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {infuraNetworkConstants} from '../../../../Infura/InfuraEndpoints';
import Config from 'react-native-config';
import axios from 'axios';
import {pinataDefaultInstance} from '../../../../network/pinataRequest';
import {COLORS} from '../../../../utils/constants/colors';
import {icons, images} from '../../../../utils/constants/assets';
import {GLOBAL_STYLES} from '../../../../utils/globalStyles';
import {fonts} from '../../../../utils/constants/fonts';
import {RouteProp, useNavigation, useTheme} from '@react-navigation/native';
import {NftDetailsProps} from '../../../../navigation/types';
import {ScrollView} from 'react-native-gesture-handler';
import {keychainData} from '../../../../redux/localStorage/localStorage';
import {reducer_user, setUserData} from '../../../../redux/slices/userslice';
import {AppDispatch} from '../../../../redux/store/store';
import {useDispatch} from 'react-redux';
import {fetchPrivateKey} from '../../../../network/requests';
import CryptoJS from 'react-native-crypto-js';
import PasswordInputModal from '../../../../components/Modal/PasswordInputModal/PasswordInputModal';
import TransactionSuccessful from '../../../../components/Modal/SuccessTransaction/TransactionSuccessful';
import {showToast} from '../../../../libs/ToastConfig';
import {STRING_CONSTANTS} from '../../../../utils/constants/stringConstants';
import {ToastType} from '../../../../components/toast/collection';

const MarketplaceAbi = require('../../../../utils/smartContractABIs/MarketplaceAbi.json');
const MarketplaceAddress = Config.MARKETPLACE_CONTRACT_ADDRESS;

const NftDetails = ({route, navigation}: NftDetailsProps) => {
  // *************************** Constants ***************************
  const web3 = new Web3(infuraNetworkConstants.base_url());
  const contract = new web3.eth.Contract(MarketplaceAbi, MarketplaceAddress);
  const contractMethods = contract.methods;
  const {width, height} = useWindowDimensions();

  // *************************** Props ***************************
  const {nftdata} = route.params;

  // *************************** Dispatch ***************************
  const dispatch = useDispatch<AppDispatch>();

  // *************************** States ***************************
  const [loader, setloader] = useState(true);
  const [user, setuser] = useState<reducer_user>();
  const [owned, setowned] = useState<boolean>(false);
  const [showModal, setshowModal] = useState(false);
  const [visible, setvisible] = useState(false);
  const [status, setstatus] = useState<string>();
  const [seller, setSeller] = useState();

  // *************************** Use Effect ***************************
  useEffect(() => {
    setUserData();
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setvisible(false);
      }, 3000);
    }
  }, [visible]);

  // *************************** Functions ***************************
  const setUserData = async () => {
    let user: reducer_user | null;
    user = await keychainData.getUserData();
    setuser(user!);
    console.log('CHECK OWNED  : ', user?.address);
    console.log('CHECK OWNED  : ', nftdata?.seller);

    await contractMethods
      .getListedForTokenId(nftdata?.tokenId)
      .call(async (err: any, res: any) => {
        console.log('RESPONSE : ::  ', res);
        if (user?.address == res?.seller) {
          setowned(true);
        }
      });
  };
  // const buyNFT = () => {
  //   console.log('BUYING');
  //   fetchUserKey();
  // };

  // ******************************** BEFORE SUBMIT PROMPT FOR PASSWORD AND DECRYPT THE KEY ********************************
  const submitHandler = () => {
    // Alert.alert('Enter your password to confirm transaction');
    // fetchUserKey();
    setshowModal(true);
    setloader(true);
  };

  // ******************************** Get Private Key ********************************
  const fetchUserKey = () => {
    setshowModal(false);
    dispatch(
      fetchPrivateKey(
        (response: any) => {
          console.log('Response End:', response?.data);
          let pk = CryptoJS.AES.decrypt(
            response.data.key,
            user?.password!,
          ).toString(CryptoJS.enc.Utf8);
          console.log('KEY VALUE : ', pk);
          pk ? ownNFT(pk) : null;
        },
        (error: any) => {
          console.log('Error End:', error);
        },
      ),
    );
  };
  // ******************************** Buy NFT ********************************
  const ownNFT = (pkey: string) => {
    console.log('Private Key : ', pkey);

    let data = contractMethods.executeSale(nftdata.tokenId).encodeABI();
    console.log('Data : ', data);
    let txnObj = {};
    try {
      txnObj = {
        to: MarketplaceAddress,
        value: nftdata.price,
        gas: 10000000,
        gasPrice: web3.utils.toWei('10', 'gwei'),
        data: data,
      };
      console.log('TX Data : ', txnObj);
    } catch (err) {
      // Idhar bhi toast daal
      console.log('TxnObje xxx: ', err);
    }

    try {
      const signTxn = web3.eth.accounts.signTransaction(
        txnObj,
        pkey,
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
              signedTxn.rawTransaction!,
              (error, txnHash) => {
                console.log('Handled xxx: ');
                console.log('Handled Error : ', error);
                console.log('Txn Hash : ', txnHash);
              },
            );
            brodcastTxn.on('error', error => {
              console.log('error :', error);
            });
            brodcastTxn.once('confirmation', receipt => {
              console.log('confirmation :', receipt);
            });
            brodcastTxn.on('receipt', receipt => {
              console.log('Receipt :', receipt);
              setloader(false);
              setstatus('Successful');
              setowned(true);
              receipt.blockHash ? setvisible(true) : {};
            });
            brodcastTxn.on('sent', sent => {
              console.log('sent Receiver:', sent);
              setstatus('Pending...');
            });
            brodcastTxn.on('sending', sending => {
              console.log('sending Receiver:', sending);
            });
            brodcastTxn.on('error', error => {
              setstatus('Unsuccessful');
              showToast(
                STRING_CONSTANTS.errors.nftbuyerror,
                STRING_CONSTANTS.errors.nftbuyerrorMsg,
                ToastType.ERROR,
              );
              console.log('error', error);
            });
          })
          .catch(error => {
            console.log('Error Signing Transaction :', error);
            setloader(false);
            setstatus('Unsuccessful');
            showToast(
              STRING_CONSTANTS.errors.nftbuyerror,
              STRING_CONSTANTS.errors.nftbuyerrorMsg,
              ToastType.ERROR,
            );
          });
      } catch (errors) {
        console.log('ERROR : ', errors);
      }
    } catch (e) {
      console.error('Error', e);
    }
  };

  return (
    <>
      <PasswordInputModal
        visible={showModal}
        onClose={() => (setshowModal(false), setloader(false))}
        onSubmit={(value: boolean) => {
          value ? fetchUserKey() : setshowModal(false);
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardView}>
        <TouchableOpacity
          style={{
            left: 30,
            top: 60,
            position: 'absolute',
            zIndex: 1,
          }}
          onPress={() => navigation.goBack()}>
          <Image source={icons.white_backarrow} />
        </TouchableOpacity>
        <View style={styles.imageView}>
          <Image
            style={[styles.imagest, {height: height - 200}]}
            source={{uri: nftdata?.image}}
          />
        </View>
        <View style={styles.bodySt}>
          <View style={styles.detailsTop}>
            <TouchableOpacity
              style={[
                GLOBAL_STYLES.smallButton,
                {
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  justifyContent: 'flex-start',
                },
              ]}>
              <Image source={icons.ethLogo} />
              <Text
                style={[
                  GLOBAL_STYLES.textPrimaryMedium13,
                  {
                    color: COLORS.white,
                    textAlignVertical: 'center',
                    includeFontPadding: false,
                    paddingStart: 5,
                  },
                ]}>
                {parseFloat(
                  web3.utils.fromWei(
                    nftdata?.price ? nftdata?.price : '0',
                    'ether',
                  ),
                ).toFixed(4) === '0.0000'
                  ? `${parseFloat(
                      web3.utils.fromWei(
                        nftdata?.price ? nftdata?.price : '0',
                        'ether',
                      ),
                    ).toFixed(3)}..`
                  : parseFloat(
                      web3.utils.fromWei(
                        nftdata?.price ? nftdata?.price : '0',
                        'ether',
                      ),
                    ).toFixed(4)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                !owned ? (status == 'Pending...' ? {} : submitHandler()) : {}
              }
              style={[GLOBAL_STYLES.smallButton, {paddingHorizontal: 30}]}>
              <Text
                style={[
                  GLOBAL_STYLES.textPrimaryMedium13,
                  {
                    color: COLORS.white,
                    includeFontPadding: false,
                    textAlignVertical: 'center',
                  },
                ]}>
                {status == 'Pending...' ? status : !owned ? 'Buy' : 'Owned'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailsBottom}>
            <Text style={[GLOBAL_STYLES.textPrimaryMedium12]}>
              {nftdata?.name}
            </Text>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryRegular10,
                {color: COLORS.gray_shade_one, textAlign: 'justify'},
              ]}>
              {nftdata?.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      <TransactionSuccessful
        visible={visible}
        message={'Transaction Successful'}
      />
    </>
  );
};

export default NftDetails;

const styles = StyleSheet.create({
  leftItemStyle: {
    marginStart: 20,
    marginEnd: 10,
  },
  rightItemStyle: {
    marginEnd: 20,
    marginStart: 10,
    marginTop: 30,
    marginBottom: 15,
  },
  detailsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 15,
  },
  detailsBottom: {
    marginBottom: 14,
  },
  bodySt: {
    // paddingVertical: 9,
    paddingHorizontal: 25,
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  imageView: {
    width: '100%',
    alignItems: 'center',
  },
  imagest: {
    width: '100%',
  },
  cardView: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
    // marginHorizontal: 20,
    // borderRadius: 30,
    // borderWidth: 1,
    // overflow: 'hidden',
  },
  loaderSt: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
