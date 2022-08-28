import { Alert } from "react-native";
import { emptyFunction } from "../utils/globalFunctions";

export function showAlertDialog(
	title: string,
	message: string,
	buttonTitle: string,
	callback: Function,
) {
	if (!callback) {
		callback = emptyFunction;
	}
	Alert.alert(
		title,
		message,
		[{ text: buttonTitle, onPress: () => callback(), style: "default" }],
		{ cancelable: false },
	);
}
export function showDoubleActionAlertDialog(
	title: string,
	message: string,
	positiveTitle: string,
	positiveCallback: Function,
	negativeTitle: string,
	negativeCallback: Function,
) {
	if (!positiveCallback) {
		positiveCallback = emptyFunction;
	}
	if (!negativeCallback) {
		negativeCallback = emptyFunction;
	}
	Alert.alert(
		title,
		message,
		[
			{
				text: negativeTitle,
				style: "cancel",
				onPress: () => negativeCallback(),
			},
			{
				text: positiveTitle,
				style: "destructive",
				onPress: () => positiveCallback(),
			},
		],
		{ cancelable: false },
	);
}