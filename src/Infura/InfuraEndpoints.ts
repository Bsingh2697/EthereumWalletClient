import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {NETWORK} from '../redux/slices/networkSlice';
import {RootState, store} from '../redux/store/store';

const hostNetworks = {
  // Ganache
  GANACHE_HOST: 'HTTP://127.0.0.1:7545',

  // Infura NETWORKS
  // Infura MAIN NETWORK
  MAIN_NET_HOST: `${Config.INFURA_MAIN_NET_URL}${Config.INFURA_KEY}`,
  // Infura TEST NETWORKS
  RINKBY_NET_HOST: `${Config.INFURA_RINKBY_NET_URL}${Config.INFURA_KEY}`,
  ROPSTEN_NET_HOST: `${Config.INFURA_ROPSTEN_NET_URL}${Config.INFURA_KEY}`,
  KOVAN_NET_HOST: `${Config.INFURA_KOVAN_NET_URL}${Config.INFURA_KEY}`,
  GOERLI_NET_HOST: `${Config.INFURA_GOERLI_NET_URL}${Config.INFURA_KEY}`,
};

const getBaseUrl = () => {
  const nwrk = store.getState();

  const currNetwork = nwrk.network.network;

  // console.log("YOooooooooooooo NETWORK  INFURA:", currNetwork);

  switch (currNetwork) {
    case NETWORK.GANACHE:
      return hostNetworks.GANACHE_HOST;
    case NETWORK.MAIN_NET:
      return hostNetworks.MAIN_NET_HOST;
    case NETWORK.GOERLI_NET:
      return hostNetworks.GOERLI_NET_HOST;
  }
};

export const infuraNetworkConstants =  { 
  base_url : () => getBaseUrl()
}


