import React, {useState} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {navigationRef} from './NavigationServices';
import {Appearance} from 'react-native';
import {DarkThemeActive, LightThemeActive} from '../utils/themes';
export default function MainNavigation() {
  const [theme, settheme] = useState(Appearance.getColorScheme());

  return (
    <NavigationContainer
      theme={theme == 'dark' ? DarkThemeActive : LightThemeActive}
      ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
}
