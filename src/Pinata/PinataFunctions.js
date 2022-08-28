import axios from 'axios';
import Config from 'react-native-config';

const key = Config.PINATA_API_KEY;
const secret = Config.PINATA_API_SECRET;

export const uploadJSONToIPFS = async JSONBody => {
  const url = Config.PINATA_JSON_UPLOAD;

  return axios({
    method: 'POST',
    url: url,
    data: JSONBody,
    headers: {
      'Content-Type': 'application/json',
      pinata_api_key: key,
      pinata_secret_api_key: secret,
    },
  })
    .then(response => {
      console.log('response json upload', response);
      return {
        success: true,
        message: 'success',
        pinataURL:
          'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
      };
    })
    .catch(error => {
      console.log('error', error);
      return {
        success: false,
        message: error.message,
        pinataURL: '',
      };
    });
};

export const uploadFileToIPFS = async file => {
  const url = Config.PINATA_FILE_UPLOAD;

  console.log('URL : ', url);
  console.log('File : ', file);

  let data = new FormData();
  data.append('file', file);

  const metadata = JSON.stringify({
    name: 'ethWallet_MP_NFT',
    keyvalues: {
      app_name: 'ethWallet',
    },
  });

  data.append('pinataMetadata', metadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });

  data.append('pinataOptions', pinataOptions);
  let headers = {
    'Content-Type': `multipart/form-data`,
    pinata_api_key: key,
    pinata_secret_api_key: secret,
  };

  console.log('URL : ', url);
  console.log('Key : ', key);
  console.log('Secret : ', secret);
  console.log('File : ', file);
  console.log('Data : ', data);
  console.log('Headers : ', headers);

  return axios({
    method: 'POST',
    url: url,
    headers: headers,
    maxBodyLength: Infinity,
    data: data,
  })
    .then(response => {
      console.log('response', response);
      console.log('Image Uploaded Succesfully', response.data.IpfsHash);
      return {
        success: true,
        message: 'success',
        pinataURL:
          'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
      };
    })
    .catch(error => {
      console.log('error', error.response.request._response);
      return {
        success: false,
        message: error.message,
        pinataURL: '',
      };
    });
};
