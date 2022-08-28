import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export enum ToastType {
    ERROR = "error",
    SUCCESS = "success",
    INFO = "info",
    DEFAULT = "default"
}

export enum ToastColorType {
    ERROR = "#FFF5F7",
    SUCCESS = "#E8FDD8",
    INFO = "#F2F6FF",
    DEFAULT = "#FFFFFF"
}

export enum ToastBorderColorType {
    ERROR = "#DB1E36",
    SUCCESS = "#5EBF8D",
    INFO = "#104FF5",
    DEFAULT = "#ADADAD"
}

export enum ToastIconType {
    TICK = "tick",
    MAIL = "mail",
    KEY = "key",
    CROSS = "cross",
    USER = "user",
    VMAIL = "verifyMail"
}

export interface AppToastProps {
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    duration?: number;
    onClose?: () => void;
    type: ToastType;
    message?: string;
    closeIcon?: object;
    closeIconStyle?: ImageStyle;
    messagebody?: string;
    
}
