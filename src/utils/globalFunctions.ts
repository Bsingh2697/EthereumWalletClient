import { Appearance, Platform } from "react-native";
import { keychainData } from "../redux/localStorage/localStorage";
import { removeUserData } from "../redux/slices/userslice";
import { appConstants } from "./constants/appConstants";

export const isNotEmptyText = (text: any) => {
	return text ? true : false;
};

export const objToFormData = (rawData: any) => {
	let formData: FormData = new FormData();
	if (rawData && rawData != null && typeof rawData === "object") {
		Object.keys(rawData).map((item, index) => {
			formData.append(item, rawData[item]);
		});
	}
	return formData;
};

export const darkTheme = () : boolean => {
	if (Appearance.getColorScheme() == 'dark' )
		return true
	return false
}

export const emptyFunction = () => { };

export const isIos = (): boolean => {
	if(Platform.OS === "ios") 
		return true
	return false
}

export const logoutHandler = async(dispatch: Function) => {
	let token = await keychainData.getUserToken()
	// console.log("CHeck1",storageInstance.getString(appConstants.token_data));
	// storageInstance.clearAll()
	await keychainData.clearData()
	dispatch(removeUserData())
	console.log(("LOGOUT DBA DIYA BHAI"));
	// console.log("CHeck2",storageInstance.getString(appConstants.token_data));
	
}