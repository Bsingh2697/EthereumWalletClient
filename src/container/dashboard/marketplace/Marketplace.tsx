import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';
import Web3 from 'web3';
import {infuraNetworkConstants} from '../../../Infura/InfuraEndpoints';
import Config from 'react-native-config';
import NftItemStyle from './NftItemStyle';
import {COLORS} from '../../../utils/constants/colors';
import {icons} from '../../../utils/constants/assets';
import LinearGradient from 'react-native-linear-gradient';
import {MarketplaceProp} from '../../../navigation/types';
import LottieView from 'lottie-react-native';
import {isIos} from '../../../utils/globalFunctions';

const MarketplaceAbi = require('../../../utils/smartContractABIs/MarketplaceAbi.json');
const MarketplaceAddress = Config.MARKETPLACE_CONTRACT_ADDRESS;

const Marketplace = ({route, navigation}: MarketplaceProp) => {
  // *************************** Constants ***************************
  const {width, height} = useWindowDimensions();
  const web3 = new Web3(infuraNetworkConstants.base_url());
  const contract = new web3.eth.Contract(MarketplaceAbi, MarketplaceAddress);
  const contractMethods = contract.methods;

  // *************************** Use States ***************************
  const [nftsList, setnftsList] = useState([]);

  // *************************** Use Effects ***************************
  useEffect(() => {
    // console.log('Fetching all nfts');
    fetchAllNFTs();
  }, []);

  // *************************** Functions ***************************

  const fetchAllNFTs = () => {
    contractMethods.getAllNFTs().call((err: any, res: any) => {
      // console.log('Error : ', err);
      // console.log('All NFTs Response :', res);
      setnftsList(res);
    });
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={icons.backgroundmp}
      style={styles.marketplaceView}>
      <View
        style={{
          alignItems: 'center',
          // alignSelf: 'center',
          justifyContent: 'center',
          // borderBottomWidth: 1,
          // borderBottomColor: COLORS.gray_shade_two,
          width: width + 20,
          marginLeft: -10,
          marginTop: isIos() ? 30 : -10,
          // marginBottom: 10,
          flexDirection: 'row',
          marginHorizontal: 20,
          elevation: 3,
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          paddingVertical: 10,
        }}>
        <LottieView
          source={{
            uri: 'https://assets1.lottiefiles.com/packages/lf20_bgdnu64h.json',
          }}
          autoPlay
          loop
          style={{height: 70, width: 70}}
        />
        <Text
          style={[
            GLOBAL_STYLES.textPrimaryMedium24,
            {
              marginTop: 10,
              color: COLORS.gray_shade_two,
            },
          ]}>
          NFT Marketplace
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          // alignItems: 'center',
          paddingTop: 10,
        }}
        data={nftsList}
        numColumns={2}
        renderItem={({item, index}) => (
          <NftItemStyle item={item} index={index} />
        )}
        extraData={nftsList}
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
                uri: 'https://assets4.lottiefiles.com/packages/lf20_zpdtmajt.json',
              }}
              autoPlay
              loop
              style={{height: 250, width: 250}}
            />
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('SELL_NFT_SCREEN')}>
        <LinearGradient
          style={styles.floatingBtnSt}
          colors={['rgba(97, 0, 255,0.7)', 'rgba(219, 0, 255,0.7)']}>
          <Image source={icons.addNft} />
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Marketplace;

const styles = StyleSheet.create({
  marketplaceView: {
    paddingBottom: 12,
    flex: 1,
  },
  lgStyle: {},
  floatingBtnSt: {
    alignSelf: 'center',
    borderRadius: 100,
    padding: 18,
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
});
