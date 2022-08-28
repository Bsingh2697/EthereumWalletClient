import { Appearance, StyleSheet } from "react-native";
import { COLORS } from "./constants/colors";
import { fonts } from "./constants/fonts";
import { darkTheme } from "./globalFunctions";

export const GLOBAL_STYLES = StyleSheet.create({

    flexOneStyle: {
        flex:1
    },
    flexGrowOneStyle:{
        flexGrow:1
    },
    flexOneWhiteStyle: {
        flex:1,
        backgroundColor: COLORS.white_color
    },
     flexGrowOneStyleWhite:{
        flexGrow:1,
        backgroundColor: COLORS.white_color
    },
    centered:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    darkThemeSafeArea: {
        flex:1,
        backgroundColor: COLORS.black
    },
    lightThemeSafeArea: {
        flex:1,
        backgroundColor: COLORS.white
    },
    whiteColor:{
        color: COLORS.white
    },
    textGrayColor:{
        color: COLORS.gray_shade_two
    },
    backgroundColor: {
        backgroundColor: COLORS.white
    },
    spacingView:{
        height:20
    },
    bottomIconSt:{
        marginTop:25,
        marginBottom:20,
    },
    longButtonStyle:{
        paddingVertical:12,
        alignItems: 'center',
        justifyContent:'center',
        borderWidth:0.6,
        borderRadius:10,
        backgroundColor : darkTheme() ? COLORS.white : COLORS.black,
    },
    longButtonBlueStyle:{
        paddingVertical:12,
        alignItems: 'center',
        justifyContent:'center',
        // borderWidth:0.6,
        borderRadius:10,
        backgroundColor : COLORS.send_recieve_color,
    },
    longButtonTxtSt:{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.black : COLORS.white,
        fontSize : 16,
    },
    longButtonBlueTxtSt:{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : COLORS.white,
        fontSize : 16,
    },
    smallButton:{
        paddingVertical:6,
        backgroundColor : COLORS.send_recieve_color,
        borderRadius:50,
        alignItems: 'center',
        justifyContent:'center',
    },
    textunderline:{
        textDecorationLine:'underline',
    },
    blackText:{
        color: COLORS.black
    },

    // **************************** Text Styles ****************************
    // **************************** Bold Primary ****************************
    textPrimaryBold30 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 30,
    },
    textPrimaryBold24 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 24,
    },
    textPrimaryBold23:{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 23,
    },
    textPrimaryBold22 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 22,
    },
    textPrimaryBold21 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 21,
    },
    textPrimaryBold20 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 20,
    },
    textPrimaryBold19 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 19,
    }, 
    textPrimaryBold18 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 18,
    },
    textPrimaryBold17:{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 17,
    },
    textPrimaryBold16 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 16,
    },
    textPrimaryBold15 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 15,
    },
    textPrimaryBold14 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 14,
    },
    textPrimaryBold13 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 13,
    },
    textPrimaryBold12 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 12,
    },
    textPrimaryBold11 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 11,
    },
    textPrimaryBold10 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 10,
    },
    textPrimaryBold9 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 9,
    },
    textPrimaryBold8 :{
        fontFamily : fonts.primary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 8,
    },

    // **************************** Bold Secondary ****************************
    textSecondaryBold30 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 30,
    },
    textSecondaryBold24 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 24,
    },
    textSecondaryBold23:{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 23,
    },
    textSecondaryBold22 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 22,
    },
    textSecondaryBold21 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 21,
    },
    textSecondaryBold20 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 20,
    },
    textSecondaryBold19 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 19,
    }, 
    textSecondaryBold18 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 18,
    },
    textSecondaryBold17:{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 17,
    },
    textSecondaryBold16 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 16,
    },
    textSecondaryBold15 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 15,
    },
    textSecondaryBold14 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 14,
    },
    textSecondaryBold13 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 13,
    },
    textSecondaryBold12 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 12,
    },
    textSecondaryBold11 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 11,
    },
    textSecondaryBold10 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 10,
    },
    textSecondaryBold9 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 9,
    },
    textSecondaryBold8 :{
        fontFamily : fonts.secondary_bold,
        fontWeight : "700",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 8,
    },

    // **************************** Medium Primary ****************************
    textPrimaryMedium30 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 30,
    },
    textPrimaryMedium24 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 24,
    },
    textPrimaryMedium23:{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 23,
    },
    textPrimaryMedium22 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 22,
    },
    textPrimaryMedium21 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 21,
    },
    textPrimaryMedium20 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 20,
    },
    textPrimaryMedium19 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 19,
    }, 
    textPrimaryMedium18 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 18,
    },
    textPrimaryMedium17:{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 17,
    },
    textPrimaryMedium16 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 16,
    },
    textPrimaryMedium15 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 15,
    },
    textPrimaryMedium14 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 14,
    },
    textPrimaryMedium13 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 13,
    },
    textPrimaryMedium12 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 12,
    },
    textPrimaryMedium11 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 11,
    },
    textPrimaryMedium10 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 10,
    },
    textPrimaryMedium9 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 9,
    },
    textPrimaryMedium8 :{
        fontFamily : fonts.primary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 8,
    },

    // **************************** Medium Secondary ****************************
    textSecondaryMedium30 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 30,
    },
    textSecondaryMedium24 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 24,
    },
    textSecondaryMedium23:{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 23,
    },
    textSecondaryMedium22 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 22,
    },
    textSecondaryMedium21 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 21,
    },
    textSecondaryMedium20 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 20,
    },
    textSecondaryMedium19 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 19,
    }, 
    textSecondaryMedium18 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 18,
    },
    textSecondaryMedium17:{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 17,
    },
    textSecondaryMedium16 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 16,
    },
    textSecondaryMedium15 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 15,
    },
    textSecondaryMedium14 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 14,
    },
    textSecondaryMedium13 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 13,
    },
    textSecondaryMedium12 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 12,
    },
    textSecondaryMedium11 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 11,
    },
    textSecondaryMedium10 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 10,
    },
    textSecondaryMedium9 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 9,
    },
    textSecondaryMedium8 :{
        fontFamily : fonts.secondary_medium,
        fontWeight : "500",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 8,
    },

    // **************************** Regular Primary ****************************
    textPrimaryRegular30 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 30,
    },
    textPrimaryRegular24 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 24,
    },
    textPrimaryRegular23:{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 23,
    },
    textPrimaryRegular22 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 22,
    },
    textPrimaryRegular21 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 21,
    },
    textPrimaryRegular20 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 20,
    },
    textPrimaryRegular19 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 19,
    }, 
    textPrimaryRegular18 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 18,
    },
    textPrimaryRegular17:{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 17,
    },
    textPrimaryRegular16 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 16,
    },
    textPrimaryRegular15 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 15,
    },
    textPrimaryRegular14 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 14,
    },
    textPrimaryRegular13 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 13,
    },
    textPrimaryRegular12 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 12,
    },
    textPrimaryRegular11 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 11,
    },
    textPrimaryRegular10 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 10,
    },
    textPrimaryRegular9 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 9,
    },
    textPrimaryRegular8 :{
        fontFamily : fonts.primary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 8,
    },

    // **************************** Regular Secondary ****************************
    textSecondaryRegular30 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 30,
    },
    textSecondaryRegular24 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 24,
    },
    textSecondaryRegular23:{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 23,
    },
    textSecondaryRegular22 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 22,
    },
    textSecondaryRegular21 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 21,
    },
    textSecondaryRegular20 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 20,
    },
    textSecondaryRegular19 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 19,
    }, 
    textSecondaryRegular18 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 18,
    },
    textSecondaryRegular17:{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 17,
    },
    textSecondaryRegular16 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 16,
    },
    textSecondaryRegular15 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 15,
    },
    textSecondaryRegular14 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 14,
    },
    textSecondaryRegular13 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 13,
    },
    textSecondaryRegular12 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 12,
    },
    textSecondaryRegular11 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 11,
    },
    textSecondaryRegular10 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 10,
    },
    textSecondaryRegular9 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 9,
    },
    textSecondaryRegular8 :{
        fontFamily : fonts.secondary_regular,
        fontWeight : "400",
        color : darkTheme() ? COLORS.white : COLORS.black,
        fontSize : 8,
    }
})