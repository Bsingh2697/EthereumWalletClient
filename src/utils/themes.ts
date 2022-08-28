import { DefaultTheme, DarkTheme } from "@react-navigation/native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { COLORS } from "./constants/colors"

export const DarkThemeActive = { 
    dark:true,
    colors : {
        primary: COLORS.white,
        background: COLORS.black,
        card: COLORS.black,
        text: COLORS.white,
        border: COLORS.white,
        notification: Colors.black,
    }
}

export const LightThemeActive = {
    dark:false,
    colors : {
        primary: COLORS.white,
        background: COLORS.white,
        card: COLORS.black,
        text: COLORS.black,
        border: COLORS.black,
        notification: COLORS.white,
    }
}