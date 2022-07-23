const hostNetworks = {
  // Ganache
  GANACHE_HOST: 'HTTP://127.0.0.1:7545',

  // Infura NETWORKS
  // Infura MAIN NETWORK
  MAIN_NET_HOST:
    'https://mainnet.infura.io/v3/12e531a7fa7d465ca2482825299e977a',
  // Infura TEST NETWORKS
  RINKBY_NET_HOST:
    'https://rinkeby.infura.io/v3/12e531a7fa7d465ca2482825299e977a',
  ROPSTEN_NET_HOST:
    'https://ropsten.infura.io/v3/12e531a7fa7d465ca2482825299e977a',
  KOVAN_NET_HOST: 'https://kovan.infura.io/v3/12e531a7fa7d465ca2482825299e977a',
  GORLI_NET_HOST:
    'https://goerli.infura.io/v3/12e531a7fa7d465ca2482825299e977a',
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
    case hostNetworks.GORLI_NET_HOST:
      obj.base_url = hostNetworks.GORLI_NET_HOST;
      break;
  }
  return obj;
};

export const web3networkConstants = {
  // BASE URL
  ...getBaseUrl(hostNetworks.RINKBY_NET_HOST),
};
