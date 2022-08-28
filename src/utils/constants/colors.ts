const theme_color_white  = "#ffffff"
const theme_color_black = "#000000"
const gray_shade_one ="#A9A9A9"
const gray_shade_two ="#544E4E"
const gray_shade_three ="#969696"
const btnColor_blue ="#166EF2"
const btnColor_blue_two='##2854F5'
const theme_color_blue="#2854F5"
const theme_color_blue_two="#166EF2"

export const alpha_white = (value:number) => `rgba(255,255,255,${value})`;
export const alpha_black = (value:number) => `rgba(0,0,0,${value})`;
export const overlay = (one:number,two:number,three:number,opacity:number)=>`rgba(${one},${two},${three},${opacity})`

export const COLORS = {
    white: theme_color_white,
    black: theme_color_black,
    gray_shade_one: gray_shade_one,
    gray_shade_two: gray_shade_two,
    gray_shade_three: gray_shade_three,
    white_overlay_min: alpha_white(0.1),
    black_overlay_min: alpha_black(0.1),
    white_overlay_med: alpha_white(0.3),
    black_overlay_med: alpha_black(0.3),
    black_overlay_med_high: alpha_black(0.65),
    white_overlay: alpha_white(0.8),
    black_overlay: alpha_black(0.8),
    white_color: theme_color_white,
    placeholder: gray_shade_one,
    transparent_color: alpha_white(0),
    btn_blue :btnColor_blue,
    send_recieve_color:btnColor_blue,
    heading_label_color: gray_shade_two,
    common_divider_color: gray_shade_two,
    cardColor:theme_color_blue,
    overlayCard: overlay(40, 84, 245,0.1),
    overlayBtn: overlay(22, 110, 242,0.3),
    theme_color_blue_two:theme_color_blue_two,
    goerli:'#45A3F3'
}
