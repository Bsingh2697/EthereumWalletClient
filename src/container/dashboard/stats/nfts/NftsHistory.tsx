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
import {GLOBAL_STYLES} from '../../../../utils/globalStyles';
import Web3 from 'web3';
import {infuraNetworkConstants} from '../../../../Infura/InfuraEndpoints';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import NftItemStyle from '../../marketplace/NftItemStyle';
import {COLORS} from '../../../../utils/constants/colors';
import {icons} from '../../../../utils/constants/assets';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store/store';
import LottieView from 'lottie-react-native';

const MarketplaceAbi = require('../../../../utils/smartContractABIs/MarketplaceAbi.json');
const MarketplaceAddress = Config.MARKETPLACE_CONTRACT_ADDRESS;

const NftsHistory = () => {
  const {width, height} = useWindowDimensions();

  // *************************** USE SELECTOR ***************************

  const user = useSelector((state: RootState) => state.user.user_data);

  // *************************** Constants ***************************

  const web3 = new Web3(infuraNetworkConstants.base_url());
  const contract = new web3.eth.Contract(MarketplaceAbi, MarketplaceAddress, {
    from: user.address,
  });
  const contractMethods = contract.methods;

  // *************************** Use States ***************************
  const [nftsList, setnftsList] = useState([]);

  // *************************** Use Effects ***************************
  useEffect(() => {
    console.log('USER ADDRESS: ', user.address);
    console.log('Fetching My nfts');
    fetchMyNFTs();
  }, []);

  // *************************** Functions ***************************

  const fetchMyNFTs = () => {
    contractMethods.getMyNFTs().call((err: any, res: any) => {
      console.log('Error : ', err);
      console.log('My NFTs Response :', res);
      setnftsList(res);
    });
  };
  return (
    <ImageBackground
      resizeMode="cover"
      source={icons.backgroundmp}
      style={styles.marketplaceView}>
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
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
                uri: 'https://assets2.lottiefiles.com/private_files/lf30_iyicd2xy.json',
              }}
              autoPlay
              loop
              style={{
                height: 250,
                width: 250,
                // marginLeft: -(width - width / 2),
              }}
            />
          </View>
        )}
      />
    </ImageBackground>
  );
};

export default NftsHistory;

const styles = StyleSheet.create({
  marketplaceView: {
    paddingBottom: 12,
    flex: 1,
  },
});
