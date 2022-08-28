import Config from "react-native-config";

const hostNetworks = {
  // Ganache
  GANACHE_HOST: 'HTTP://127.0.0.1:7545',

  // Infura NETWORKS
  // Infura MAIN NETWORK
  MAIN_NET_HOST:`${Config.INFURA_MAIN_NET_URL}${Config.INFURA_KEY}`,
  // Infura TEST NETWORKS
  RINKBY_NET_HOST:`${Config.INFURA_RINKBY_NET_URL}${Config.INFURA_KEY}`,
  ROPSTEN_NET_HOST:`${Config.INFURA_ROPSTEN_NET_URL}${Config.INFURA_KEY}`,
  KOVAN_NET_HOST:`${Config.INFURA_KOVAN_NET_URL}${Config.INFURA_KEY}`,
  GOERLI_NET_HOST:`${Config.INFURA_GOERLI_NET_URL}${Config.INFURA_KEY}`,
};

const getBaseUrl = (network: string) => {
  let obj = {base_url: ''};
  switch (network) {
    case hostNetworks.GANACHE_HOST:
      obj.base_url = hostNetworks.GANACHE_HOST;
      break;
    case hostNetworks.MAIN_NET_HOST:
      obj.base_url = hostNetworks.MAIN_NET_HOST;
      break;
    case hostNetworks.RINKBY_NET_HOST:
      obj.base_url = hostNetworks.RINKBY_NET_HOST;
      break;
    case hostNetworks.ROPSTEN_NET_HOST:
      obj.base_url = hostNetworks.ROPSTEN_NET_HOST;
      break;
    case hostNetworks.KOVAN_NET_HOST:
      obj.base_url = hostNetworks.KOVAN_NET_HOST;
      break;
    case hostNetworks.GOERLI_NET_HOST:
      obj.base_url = hostNetworks.GOERLI_NET_HOST;
      break;
  }
  return obj;
};

export const web3networkConstants = {
  // BASE URL
  ...getBaseUrl(hostNetworks.GOERLI_NET_HOST),
};
