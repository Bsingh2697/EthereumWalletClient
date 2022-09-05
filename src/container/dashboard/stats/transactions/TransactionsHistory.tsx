import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  escanParam,
  fetchCurrentBlockNumber,
  fetchUserHistory,
} from '../../../../Etherscan/apiRequests/requests';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store/store';
import {API_REQUEST} from '../../../../network/collection';
import {showToast} from '../../../../libs/ToastConfig';
import {STRING_CONSTANTS} from '../../../../utils/constants/stringConstants';
import {ToastType} from '../../../../components/toast/collection';
import TransactionItem from './TransactionItem';
import LottieView from 'lottie-react-native';

const TransactionsHistory = () => {
  // *************************** USE SELECTOR ***************************
  const user = useSelector((state: RootState) => state.user.user_data);
  const token = useSelector((state: RootState) => state.user.token);
  // *************************** USE State ***************************
  const [transactionsList, settransactionsList] = useState<any[]>([]);
  const [page, setpage] = useState(1);
  const [offset, setoffset] = useState(10);
  const [lastBlock, setlastBlock] = useState();
  // *************************** USE Effect ***************************
  useEffect(() => {
    fetchBlockNumber();
  }, []);

  const fetchtransactions = (maxBlock?: number) => {
    let params: escanParam = {
      module: 'account',
      action: 'txlist',
      address: user.address,
      startblock: 0,
      endblock: maxBlock ? maxBlock : lastBlock,
      page: page,
      offset: offset,
    };
    console.log('Params', params);
    fetchUserHistory(
      API_REQUEST.GET,
      params,
      successCBTransaction,
      errorCBTransaction,
    );
  };

  const fetchBlockNumber = () => {
    let time = Math.floor(Date.now() / 1000);
    console.log('Params TIME type', typeof time);
    console.log('Params TIME ', Math.floor(time));
    let params: escanParam = {
      module: 'block',
      action: 'getblocknobytime',
      timestamp: time,
      closest: 'before',
    };
    // console.log('Params', params);
    fetchCurrentBlockNumber(
      API_REQUEST.GET,
      params,
      successCBBlockNumber,
      errorCBBlockNumber,
    );
  };
  // *************************** Block Number Callback ***************************
  const successCBBlockNumber = (resp: any) => {
    console.log('Response', resp);
    setlastBlock(resp.data.result);
    fetchtransactions(resp.data.result);
  };
  const errorCBBlockNumber = (resp: any) => {
    console.log('Response', resp);
    showToast(
      STRING_CONSTANTS.errors.somethingWrong,
      STRING_CONSTANTS.errors.pleaseTryAgain,
      ToastType.ERROR,
    );
  };
  // *************************** Transaction Callback ***************************
  const successCBTransaction = (resp: any) => {
    console.log('Success Escan', resp);
    settransactionsList([...transactionsList, ...resp.data.result]);
    setpage(page => page + 1);
  };
  const errorCBTransaction = (resp: any) => {
    console.log('Error Escan', resp);
    showToast(
      STRING_CONSTANTS.errors.somethingWrong,
      STRING_CONSTANTS.errors.pleaseTryAgain,
      ToastType.ERROR,
    );
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      data={transactionsList}
      renderItem={({item}) => <TransactionItem item={item} />}
      onEndReached={() => fetchtransactions()}
      onEndReachedThreshold={0.3}
      // getItemLayout={(data, index) => ({
      //   length: 200,
      //   offset: 200 * index,
      //   index,
      // })}
      ListEmptyComponent={() => (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            source={{
              uri: 'https://lottie.host/1f6bb126-2afa-484a-a818-ed23f82369bc/aBuXMOwQby.json',
            }}
            autoPlay
            loop
            style={{height: 200, width: 200}}
          />
        </View>
      )}
    />
  );
};

export default TransactionsHistory;

const styles = StyleSheet.create({});
