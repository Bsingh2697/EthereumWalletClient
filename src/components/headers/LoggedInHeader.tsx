import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GLOBAL_STYLES} from '../../utils/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {darkTheme} from '../../utils/globalFunctions';

interface headerProps {
  children: React.ReactElement;
}

const LoggedInHeader = ({children}: headerProps) => {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      // style={[
      //   darkTheme()
      //     ? GLOBAL_STYLES.darkThemeSafeArea
      //     : GLOBAL_STYLES.lightThemeSafeArea,
      // ]}
    >
      <Text style={[GLOBAL_STYLES.textPrimaryBold10]}>
        This is INNER header
      </Text>
      {children}
    </SafeAreaView>
  );
};

export default LoggedInHeader;

const styles = StyleSheet.create({});
