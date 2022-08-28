import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {NETWORK} from '../../redux/slices/networkSlice';
import {RootState, store} from '../../redux/store/store';

const hostNetworks = {
  // Ganache
  GANACHE_HOST: 'HTTP://127.0.0.1:7545',

  // Infura NETWORKS
  // Infura MAIN NETWORK
  MAIN_NET_HOST: `${Config.ETHERSCAN__MAIN_NET_URL}`,
  // Infura TEST NETWORKS
  RINKBY_NET_HOST: `${Config.ETHERSCAN__RINKBY_NET_URL}`,
  ROPSTEN_NET_HOST: `${Config.ETHERSCAN__ROPSTEN_NET_URL}`,
  KOVAN_NET_HOST: `${Config.ETHERSCAN__KOVAN_NET_URL}`,
  GOERLI_NET_HOST: `${Config.ETHERSCAN__GOERLI_NET_URL}`,
  //   SEPOLIA_NET_HOST:`${Config.ETHERSCAN__SEPOLIA_NET_URL}`,
};

const getBaseUrl = () => {
  const nwrk = store.getState();

  const currNetwork = nwrk.network.network;

  console.log("CURRENT NETWORK ETHER SCAN:", currNetwork);
  

  let obj = {base_url: ''};
  switch (currNetwork) {
    case NETWORK.GANACHE:
      return hostNetworks.GANACHE_HOST;
    case NETWORK.MAIN_NET:
      return hostNetworks.MAIN_NET_HOST;
    case NETWORK.GOERLI_NET:
      return hostNetworks.GOERLI_NET_HOST;
  }
  return obj;
};

export const etherScanNetwork = {
  // BASE URL
  base_url : () => getBaseUrl()
};
