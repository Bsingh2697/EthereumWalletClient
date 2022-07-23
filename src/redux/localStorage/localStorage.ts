import {MMKV} from 'react-native-mmkv';

export const storageInstance = new MMKV({
  id: 'user-local-storage',
});
