import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { nftDataType } from "../container/dashboard/marketplace/NftItemStyle";
import { NAVIGATIONS } from "../utils/constants/navigationConstants";





// Root Stack Param List
export type RootStackParamList = OuterStackParamList & InnerStackParamList & {
    OUTER_NAV : OuterStackParamList,
    INNER_NAV : InnerStackParamList,
}

// FIX USE NAVIGATION ISSUE
declare global {
  namespace ReactNavigation{
    interface RootParamList extends RootStackParamList {}
  }
}

// Outer Stack Param List
export type OuterStackParamList = {
  ONBOARDING_SCREEN:  undefined,
  LOGIN_SCREEN: undefined
  SIGNUP_SCREEN: undefined
  TERMS_SCREEN : undefined
  POLICY_SCREEN: undefined
}

// Inner Stack Param List
export type InnerStackParamList = {
  INNER_TAB_NAVIGATION: undefined,
  SEND_ETH_SCREEN: undefined,
  RECEIVE_ETH_SCREEN: undefined
  HOME_SCREEN: undefined,
  MARKETPLACE_SCREEN: undefined,
  STATS_SCREEN: undefined,
  PROFILE_SCREEN: undefined,
  NFT_DETAILS_SCREEN: {nftdata: nftDataType};
  BUY_NFT_SCREEN:undefined,
  SELL_NFT_SCREEN:undefined,
  FAQ_SCREEN:undefined,
}


// Outer Stack Props
export type OnBoardingProp = NativeStackScreenProps<OuterStackParamList,NAVIGATIONS.ONBOARDING_SCREEN>
export type SignUpProp = NativeStackScreenProps<OuterStackParamList,NAVIGATIONS.SIGNUP_SCREEN>
export type LoginProp = NativeStackScreenProps<OuterStackParamList,NAVIGATIONS.LOGIN_SCREEN>
export type TermsProp = NativeStackScreenProps<OuterStackParamList,NAVIGATIONS.TERMS_SCREEN>
export type PrivacyProp = NativeStackScreenProps<OuterStackParamList,NAVIGATIONS.POLICY_SCREEN>

// Inner Stack Props
export type SendEthProp = NativeStackScreenProps<InnerStackParamList,NAVIGATIONS.SEND_ETH_SCREEN>
export type ReceiveEthProp = NativeStackScreenProps<InnerStackParamList,NAVIGATIONS.RECEIVE_ETH_SCREEN>
export type HomeProp = NativeStackScreenProps<InnerStackParamList,NAVIGATIONS.HOME_SCREEN>
export type MarketplaceProp = NativeStackScreenProps<InnerStackParamList,NAVIGATIONS.HOME_SCREEN>
export type StatProp = NativeStackScreenProps<InnerStackParamList,NAVIGATIONS.HOME_SCREEN>
export type ProfileProp = NativeStackScreenProps<InnerStackParamList,NAVIGATIONS.HOME_SCREEN>
export type NftDetailsProps = NativeStackScreenProps<InnerStackParamList,NAVIGATIONS.NFT_DETAILS_SCREEN>
export type BuyNftProps = NativeStackScreenProps<InnerStackParamList,NAVIGATIONS.BUY_NFT_SCREEN>
export type SellNftProps = NativeStackScreenProps<InnerStackParamList,NAVIGATIONS.SELL_NFT_SCREEN>
export type FaqProps = NativeStackScreenProps<InnerStackParamList,NAVIGATIONS.FAQ_SCREEN>





