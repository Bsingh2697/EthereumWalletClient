import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  escanParam,
  fetchUserHistory,
} from '../../../../Etherscan/apiRequests/requests';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store/store';
import {API_REQUEST} from '../../../../network/collection';
import {showToast} from '../../../../libs/ToastConfig';
import {STRING_CONSTANTS} from '../../../../utils/constants/stringConstants';
import moment from 'moment';
import {COLORS} from '../../../../utils/constants/colors';
import {GLOBAL_STYLES} from '../../../../utils/globalStyles';
import Web3 from 'web3';
import {infuraNetworkConstants} from '../../../../Infura/InfuraEndpoints';

const TransactionItem = ({item}: any) => {
  useEffect(() => {
    console.log('ITEM', item);
  }, []);
  const web3 = new Web3(infuraNetworkConstants.base_url());

  return (
    <View style={styles.itemView}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}>
        <View style={styles.blockView}>
          <Text style={GLOBAL_STYLES.textPrimaryMedium12}>Block number</Text>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryRegular10,
              GLOBAL_STYLES.textGrayColor,
              {marginStart: 5},
            ]}>
            {item?.blockNumber}
          </Text>
        </View>
        <View>
          <Text
            style={[
              GLOBAL_STYLES.textSecondaryMedium10,
              {color: COLORS.gray_shade_three},
            ]}>
            {moment.unix(item?.timeStamp).format('DD/MM/YYYY HH:mm:ss')}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          marginBottom: 3,
          marginTop: 5,
        }}>
        <Text style={[GLOBAL_STYLES.textPrimaryMedium12]}>FROM</Text>
        <Text
          style={[
            GLOBAL_STYLES.textPrimaryRegular10,
            GLOBAL_STYLES.textGrayColor,
            {marginStart: 5},
          ]}>
          {item?.from}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
        <Text style={[GLOBAL_STYLES.textPrimaryMedium12]}>TO</Text>
        <Text
          style={[
            GLOBAL_STYLES.textPrimaryRegular10,
            GLOBAL_STYLES.textGrayColor,
            {marginStart: 5},
          ]}>
          {item?.to}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={[GLOBAL_STYLES.textPrimaryMedium12]}>Hash</Text>
        <View style={{flex: 1, alignItems: 'baseline', paddingTop: 2}}>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryRegular10,
              GLOBAL_STYLES.textGrayColor,
              {marginStart: 5},
            ]}>
            {item?.hash}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}>
        <View style={[styles.labelsView]}>
          <View style={styles.btnViewSt}>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryMedium10,
                GLOBAL_STYLES.whiteColor,
              ]}
              numberOfLines={1}>
              {web3.utils.fromWei(item?.value, 'ether')} eth
            </Text>
          </View>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryMedium10,
              {color: COLORS.gray_shade_two, marginTop: 3},
            ]}>
            Value
          </Text>
        </View>
        <View style={[styles.labelsView, {marginHorizontal: 10}]}>
          <View style={styles.btnViewSt}>
            <Text
              numberOfLines={1}
              style={[
                GLOBAL_STYLES.textPrimaryMedium10,
                GLOBAL_STYLES.whiteColor,
              ]}>
              {item?.gas} wei
            </Text>
          </View>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryMedium10,
              {color: COLORS.gray_shade_two, marginTop: 3},
            ]}>
            gas
          </Text>
        </View>
        <View style={[styles.labelsView]}>
          <View
            style={[
              styles.btnViewSt,
              {flexDirection: 'row', justifyContent: 'center'},
            ]}>
            <Text
              numberOfLines={1}
              style={[
                GLOBAL_STYLES.textPrimaryMedium10,
                GLOBAL_STYLES.whiteColor,
              ]}>
              {web3.utils.fromWei(item?.gasPrice, 'Gwei')}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                GLOBAL_STYLES.textPrimaryMedium10,
                GLOBAL_STYLES.whiteColor,
              ]}>
              {' '}
              gwei
            </Text>
          </View>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryMedium10,
              {color: COLORS.gray_shade_two, marginTop: 3},
            ]}>
            gasPrice
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  itemView: {
    marginBottom: 10,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: COLORS.overlayCard,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  blockView: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: COLORS.overlayBtn,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  labelsView: {
    flex: 1,
    alignItems: 'center',
  },
  btnViewSt: {
    backgroundColor: COLORS.btn_blue,
    paddingVertical: 3,
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
