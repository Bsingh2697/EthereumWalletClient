import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBAL_STYLES} from '../../../../utils/globalStyles';
import OuterHeader from '../../../../components/headers/OuterHeader';
import {icons} from '../../../../utils/constants/assets';
import {darkTheme} from '../../../../utils/globalFunctions';
import {SendEthProp} from '../../../../navigation/types';
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
import SendEthForm from './SendEthForm';
import Web3 from 'web3';
import {showToast} from '../../../../libs/ToastConfig';
import {hideLoader, showLoader} from '../../../../redux/slices/uiSlice';
import {
  ToastColorType,
  ToastType,
} from '../../../../components/toast/collection';
import {useSelector} from 'react-redux';
import {infuraNetworkConstants} from '../../../../Infura/InfuraEndpoints';
import TransactionSuccessful from '../../../../components/Modal/SuccessTransaction/TransactionSuccessful';

type transactionSend = {
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
};
type transactionData = transactionSend & {
  from: string;
};

const SendEth = ({route, navigation}: SendEthProp) => {
  // *************************** WEB3 ***************************
  const web3 = new Web3(infuraNetworkConstants.base_url());
  // *************************** Use State ***************************
  const [fromValue, setfromValue] = useState<string>();
  const [toValue, settoValue] = useState<string>();
  const [password, setpassword] = useState<string>();
  const [showModal, setshowModal] = useState(false);
  const [transactionData, setTransactionData] = useState<transactionData>();
  const [visible, setvisible] = useState(false);
  const [status, setstatus] = useState<string>();
  const [loader, setloader] = useState(false);
  // *************************** Dispatch ***************************
  const dispatch = useDispatch<AppDispatch>();
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

  // ******************************** Setting User Address ********************************
  const setUserData = async () => {
    let user = await keychainData.getUserData();
    setfromValue(user?.address);
    setpassword(user?.password);
  };
  // ******************************** BEFORE SUBMIT PROMPT FOR PASSWORD AND DECRYPT THE KEY ********************************
  const submitHandler = (values: transactionSend) => {
    // Alert.alert('Enter your password to confirm transaction');
    // fetchUserKey();
    setTransactionData({...values, from: fromValue!});
    setshowModal(true);
    setloader(true);
  };

  const fetchUserKey = () => {
    setshowModal(false);
    dispatch(
      fetchPrivateKey(
        (response: any) => {
          console.log('Response End:', response?.data);
          let pk = CryptoJS.AES.decrypt(response.data.key, password!).toString(
            CryptoJS.enc.Utf8,
          );
          console.log('KEY VALUE : ', pk);
          pk ? sendTransaction(pk) : null;
        },
        (error: any) => {
          console.log('Error End:', error);
          setloader(false);
        },
      ),
    );
  };

  const sendTransaction = async (pk: string) => {
    // dispatch(showLoader());
    console.log('SENDING TRANSACTION');
    console.log('Final Data:', transactionData);
    if (
      transactionData?.to &&
      transactionData?.value &&
      transactionData?.gas &&
      transactionData?.gasPrice &&
      transactionData?.value
    ) {
      let tData = {
        to: transactionData.to,
        value: web3.utils.toWei(transactionData.value, 'ether'),
        gas: transactionData.gas,
        gasPrice: web3.utils.toWei(transactionData.gasPrice, 'gwei'),
      };
      try {
        // SIGNING TRANSACTION
        let signedTransaction = web3.eth.accounts.signTransaction(tData, pk);

        // Broadcasting Transaction
        signedTransaction
          .then(signedTxn => {
            const broadcastTxn = web3.eth.sendSignedTransaction(
              signedTxn.rawTransaction!,
            );
            broadcastTxn.once('receipt', receipt => {
              console.log(
                'Receipt Receiver:---------------------',
                receipt.blockHash,
              );
              setloader(false);
              setstatus('Successful');
              receipt.blockHash ? setvisible(true) : {};
              // showToast(
              //   STRING_CONSTANTS.transaction.success,
              //   `${web3.utils.fromWei(
              //     transactionData.value,
              //     'ether',
              //   )} ether has been successfully transferred to ${receipt.to}`,
              // );
              dispatch(hideLoader());
            });
            broadcastTxn.on('error', err => {
              console.log('Error Receiver:---------------------', err.message);
              showToast(
                STRING_CONSTANTS.transaction.failure,
                err.message,
                ToastType.ERROR,
              );
              setloader(false);
            });
            broadcastTxn.once('confirmation', confirmed => {
              console.log(
                'Confirmed Receiver:---------------------',
                confirmed.toString(),
              );
              showToast(
                STRING_CONSTANTS.transaction.confirmed,
                STRING_CONSTANTS.transaction.confirmedBody,
              );
              dispatch(hideLoader());
            });
            broadcastTxn.on('sent', sent => {
              console.log(
                'SEnt Receiver---------------------:',
                sent.toString(),
              );
              setstatus('Pending...');
              showToast(STRING_CONSTANTS.transaction.sent, ' ');
            });
            broadcastTxn.on('sending', sending => {
              console.log('sending Receiver:---------------------', sending);
              showToast(STRING_CONSTANTS.transaction.sending, ' ');
            });
            broadcastTxn.on('error', error => {
              setstatus('Unsuccessful');

              console.log('error', error);
            });
            broadcastTxn.on('transactionHash', transactionHash => {
              console.log(
                'transactionHash Receiver:---------------------',
                transactionHash.toString(),
              );
              showToast(
                STRING_CONSTANTS.transaction.trackTransaction,
                transactionHash.toString(),
              );
              dispatch(hideLoader());
            });
          })
          .catch(err => {
            console.log('ERROR : ', err);
            setloader(false);
            setstatus('Unsuccessful');
            showToast(
              STRING_CONSTANTS.transaction.error,
              err.toString(),
              ToastType.ERROR,
            );
          });
      } catch (errors) {
        console.log('ERROR : ', errors);
      }
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
      <OuterHeader
        leftBackground={icons.encircle}
        leftIcon={icons.outerHeaderLogo}
        leftPress={() => console.log('Left Press')}
        rightBackground={icons.encircle}
        rightIcon={darkTheme() ? icons.cross_white : icons.cross}
        rightPress={() => navigation.goBack()}>
        <View style={styles.viewSt}>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryMedium24,
              GLOBAL_STYLES.textunderline,
              {
                letterSpacing: 1,
                color: darkTheme() ? COLORS.white : COLORS.heading_label_color,
              },
            ]}>
            Send
          </Text>
          {status ? (
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryMedium12,
                status == 'Successful'
                  ? {color: COLORS.green}
                  : status == 'Unsuccessful'
                  ? {color: COLORS.red}
                  : {color: COLORS.gray_shade_three},
              ]}>
              {status}
            </Text>
          ) : null}
          <View style={styles.inputView}>
            {/* <SendInputField
              label={'From'}
              setValue={(value: string) => setfromValue(value)}
              placeholder={'From'}
              lines={1}
              value={fromValue}
              disabled={true}
            />
            <View style={{marginTop: 20}}></View>
            <SendInputField
              label={'To'}
              setValue={(value: string) => settoValue(value)}
              placeholder={'Address'}
              lines={1}
              value={toValue}
            /> */}
            <SendEthForm
              from={fromValue}
              submitTansaction={submitHandler}
              loader={loader}
            />
          </View>
        </View>
      </OuterHeader>
      <TransactionSuccessful
        visible={visible}
        message={'Transaction Successful'}
      />
    </>
  );
};

export default SendEth;

const styles = StyleSheet.create({
  viewSt: {
    paddingHorizontal: 20,
    marginTop: 60,
  },
  inputView: {
    marginTop: 40,
    marginBottom: 100,
  },
});
