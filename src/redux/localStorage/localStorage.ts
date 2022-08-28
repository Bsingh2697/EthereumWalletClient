import * as Keychain from 'react-native-keychain';
import { reducer_user } from '../slices/userslice';
import { appConstants } from '../../utils/constants/appConstants';

type kcStoreData = {
  user : reducer_user,
  token :string
}

// export const storageInstance = new MMKV({
//   id: 'user-local-storage',
// });

export const keychainData = {
  setData : async(data : reducer_user, token :string) => {
    let username :reducer_user = {
      username:data.username,
      password:data.password,
      address:data.address,
      user_id:data.user_id
    }
    console.log("DATA RECEIVED TO STORE IN Keychain", JSON.stringify(username));
    
    let password  = token
    await Keychain.setGenericPassword(JSON.stringify(username), password)
  },
  getData : async() : Promise<kcStoreData | null> => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials){
      let user : reducer_user = JSON.parse(credentials.username) 
      let data : reducer_user= {
        username :  user.username,
        password : user.password,
        user_id : user.user_id,
        address : user.address
      }
      let token = credentials.password
      let finalData = {
        user : data,
        token : token
      }
      return finalData
    }
    return null
  },
  getUserData : async() : Promise<reducer_user | null> => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials){
      let user : reducer_user = JSON.parse(credentials.username) 
      let data : reducer_user= {
        username :  user.username,
        password : user.password,
        user_id : user.user_id,
        address : user.address
      }
      console.log(" KC STORED DATA: ",data);
      
      return data
    }
    return null
  },
  getUserToken : async() : Promise<string|null> => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials){
      let token = credentials.password
      console.log(" KC STORED TOKEN: ",token);
      return token
    }
    return null
  },
  clearData : async() => await Keychain.resetGenericPassword()
}