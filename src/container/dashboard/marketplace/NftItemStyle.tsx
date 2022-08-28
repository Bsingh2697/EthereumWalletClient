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
import {RouteProp, useNavigation, useTheme} from '@react-navigation/native';
import {infuraNetworkConstants} from '../../../Infura/InfuraEndpoints';
import Config from 'react-native-config';
import axios from 'axios';
import {pinataDefaultInstance} from '../../../network/pinataRequest';
import {COLORS} from '../../../utils/constants/colors';
import {icons, images} from '../../../utils/constants/assets';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';
import {fonts} from '../../../utils/constants/fonts';
type props = {
  item: any;
  index: number;
};
export type nftDataType = {
  description: string;
  image: string;
  mintDate: string;
  name: string;
  price: string;
  tokenId: string;
  seller: string;
};
const MarketplaceAbi = require('../../../utils/smartContractABIs/MarketplaceAbi.json');
const MarketplaceAddress = Config.MARKETPLACE_CONTRACT_ADDRESS;

const NftItemStyle = ({item, index}: props) => {
  // *************************** Constants ***************************
  const web3 = new Web3(infuraNetworkConstants.base_url());
  const contract = new web3.eth.Contract(MarketplaceAbi, MarketplaceAddress);
  const contractMethods = contract.methods;
  // *************************** Use Dimensions ***************************
  const {width, height} = useWindowDimensions();
  // *************************** Use Navigation ***************************
  const navigation = useNavigation();

  // *************************** Use Effect ***************************
  useEffect(() => {
    fetchMetaData();
  }, []);

  // *************************** States ***************************
  const [nftData, setnftData] = useState<nftDataType>();
  const [loader, setloader] = useState(true);
  // *************************** Functions ***************************
  const fetchMetaData = async () => {
    // console.log('Item Data : ', item);
    let tokenMeta = await contractMethods
      .tokenURI(item?.tokenId)
      .call(async (err: any, res: any) => {
        // console.log('Meta Data URL :', res);
        let nftMetaData = await pinataDefaultInstance.get(res);
        console.log(
          'Meta Data : ',
          'TOKEN ID:',
          item?.tokenId,
          '===',
          nftMetaData,
        );
        console.log('Image Data : ', nftMetaData?.data?.image);
        console.log(
          'Price Data : ',
          web3.utils.fromWei(nftMetaData?.data?.price, 'ether'),
        );

        setnftData({
          ...nftMetaData?.data,
          tokenId: item?.tokenId,
          seller: item?.seller,
        });
        setloader(false);
      });
  };

  return (
    <>
      {loader ? (
        <>
          <View
            style={[
              styles.cardView,
              styles.loaderSt,
              {height: '100%', width: '100%'},
            ]}>
            <ActivityIndicator size={'large'} color={COLORS.black} />
          </View>
        </>
      ) : (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NFT_DETAILS_SCREEN', {nftdata: nftData!})
          }
          style={[
            styles.cardView,
            {width: width / 2 - 40},
            index % 2 == 0 ? styles.leftItemStyle : styles.rightItemStyle,
          ]}>
          <View>
            <View style={styles.imageView}>
              <Image
                resizeMode="cover"
                style={styles.imagest}
                source={{uri: nftData?.image}}
              />
            </View>
            <View style={[styles.bodySt]}>
              <TouchableOpacity
                //   onPress={}
                style={[
                  {
                    flexDirection: 'row',
                    //   paddingHorizontal: 15,
                    justifyContent: 'flex-start',
                  },
                ]}>
                <Image source={icons.ethLogo} />
                <Text
                  style={[
                    GLOBAL_STYLES.textPrimaryMedium10,
                    {
                      color: COLORS.white,
                      textAlignVertical: 'center',
                      includeFontPadding: false,
                      paddingStart: 5,
                    },
                  ]}>
                  {parseFloat(
                    web3.utils.fromWei(
                      nftData?.price ? nftData?.price : '0',
                      'ether',
                    ),
                  ).toFixed(4) === '0.0000'
                    ? `${parseFloat(
                        web3.utils.fromWei(
                          nftData?.price ? nftData?.price : '0',
                          'ether',
                        ),
                      ).toFixed(3)}..`
                    : parseFloat(
                        web3.utils.fromWei(
                          nftData?.price ? nftData?.price : '0',
                          'ether',
                        ),
                      ).toFixed(4)}{' '}
                  eth
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default NftItemStyle;

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
    marginVertical: 15,
  },
  detailsBottom: {
    marginBottom: 14,
  },
  bodySt: {
    paddingVertical: 9,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.black_overlay_med_high,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  imageView: {
    width: '100%',
    alignItems: 'center',
  },
  imagest: {
    height: 200,
    width: '100%',
  },
  cardView: {
    marginVertical: 10,
    // flex: 1,
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
