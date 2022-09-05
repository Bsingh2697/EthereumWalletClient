import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';
import {useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store/store';
import {isIos, logoutHandler} from '../../../utils/globalFunctions';
import {useSelector} from 'react-redux';
import {keychainData} from '../../../redux/localStorage/localStorage';
import {appConstants} from '../../../utils/constants/appConstants';
import {icons} from '../../../utils/constants/assets';
import {COLORS} from '../../../utils/constants/colors';
import {HomeProp} from '../../../navigation/types';
import {NAVIGATIONS} from '../../../utils/constants/navigationConstants';
import Web3 from 'web3';
import {reducer_user} from '../../../redux/slices/userslice';
import {infuraNetworkConstants} from '../../../Infura/InfuraEndpoints';
import SwitchNetwork from '../../../components/Modal/NetworkChangeModal/SwitchNetwork';
import Clipboard from '@react-native-clipboard/clipboard';
import MiscInfoTabs from './MiscInfo/MiscInfoTabs';

const Home = ({route, navigation}: HomeProp) => {
  // *************************** WEB3 ***************************
  const web3 = new Web3(infuraNetworkConstants.base_url());
  console.log('INFURA NETWORK HOME : ', infuraNetworkConstants.base_url());

  // *************************** Dimensions ***************************
  const {height, width} = Dimensions.get('window');
  // *************************** USE SELECTOR ***************************
  const user = useSelector((state: RootState) => state.user.user_data);
  const token = useSelector((state: RootState) => state.user.token);
  const currNetwork = useSelector((state: RootState) => state.network.network);

  // *************************** USE STATE ***************************
  const [balance, setbalance] = useState<number>(0);
  const [showNetworkModal, setshowNetworkModal] = useState(false);
  // *************************** Dispatch ***************************
  const dispatch = useDispatch<AppDispatch>();
  // *************************** Use Effect ***************************
  useEffect(() => {
    // console.log('USER DATA : ');
    // let str = storageInstance.getString(appConstants.user_data);

    // console.log('USER IN STORAGE :', str);
    // console.log('USER IN REDUX :', user);
    fetchKCdata();
  }, []);

  const fetchKCdata = async () => {
    let kcToken = await keychainData.getUserToken();
    let kcData = await keychainData.getUserData();
    fetchUserBalance(kcData!);
    console.log('USER IN KC :', JSON.stringify(kcData));
    console.log('Token IN KC :', kcToken);
  };

  const fetchUserBalance = async (data: reducer_user) => {
    web3.eth.getBalance(data.address, (err, res) => {
      console.log("User's Balance: ", web3.utils.fromWei(res, 'ether'));
      let value = web3.utils.fromWei(res, 'ether');
      setbalance(parseFloat(value));
    });
  };

  const toggleNetworkModal = () => {
    setshowNetworkModal(!showNetworkModal);
  };

  // USE EFFECT
  useEffect(() => {
    console.log('CURRENT NETWORK  UPDATED:', currNetwork);
    fetchKCdata();
  }, [currNetwork]);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          position: 'absolute',
          bottom: height - 425,
        }}>
        <Image source={icons.backgroundDashboard} resizeMode="cover" />
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            marginTop: 50,
            width: '100%',
            paddingHorizontal: 25,
            alignItems: 'center',
          }}>
          <Pressable
            onPress={toggleNetworkModal}
            style={{
              alignSelf: 'flex-end',
              marginBottom: 22,
              paddingLeft: 30,
            }}>
            <Image source={icons.more_options} />
          </Pressable>
          <Image source={icons.defaultImage} />
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 18}}>
            <Text
              numberOfLines={1}
              style={[
                GLOBAL_STYLES.textPrimaryMedium11,
                {width: 130, color: COLORS.white},
              ]}>
              {user.address}
            </Text>
            <TouchableOpacity onPress={() => Clipboard.setString(user.address)}>
              <Image source={icons.copy} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 22}}>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryMedium24,
                {color: COLORS.white},
                GLOBAL_STYLES.textunderline,
              ]}>
              {balance.toFixed(3)} eth
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 80,
          }}>
          <View
            style={[
              {flexDirection: 'row'},
              isIos() ? {marginTop: 30, marginBottom: 10} : {},
            ]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SEND_ETH_SCREEN')}
              style={{alignItems: 'center'}}>
              <View style={[styles.sendRecieveViewSt]}>
                <Image
                  style={[styles.sendRecieveImageSt]}
                  source={icons.send}
                />
              </View>
              <Text
                style={[GLOBAL_STYLES.textPrimaryMedium14, {letterSpacing: 1}]}>
                Send
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RECEIVE_ETH_SCREEN')}
              style={{marginStart: 70, alignItems: 'center'}}>
              <View style={[styles.sendRecieveViewSt]}>
                <Image
                  style={[styles.sendRecieveImageSt]}
                  source={icons.receive}
                />
              </View>
              <Text
                style={[GLOBAL_STYLES.textPrimaryMedium14, {letterSpacing: 1}]}>
                Receive
              </Text>
            </TouchableOpacity>
          </View>
          <MiscInfoTabs />
        </View>
      </View>
      <SwitchNetwork
        visible={showNetworkModal}
        onClose={() => setshowNetworkModal(false)}
        onSubmit={toggleNetworkModal}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  sendRecieveViewSt: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: COLORS.send_recieve_color,
    borderRadius: 50,
    marginBottom: 6,
  },
  sendRecieveImageSt: {},
});
