import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/constants/colors';
('');
const Loader = () => {
  return (
    <View style={styles.overlaySt}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlaySt: {
    position: 'absolute',
    backgroundColor: COLORS.black_overlay_med_high,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
});
