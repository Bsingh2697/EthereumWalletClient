import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {GLOBAL_STYLES} from '../../utils/globalStyles';
import {darkTheme} from '../../utils/globalFunctions';
import {COLORS} from '../../utils/constants/colors';

type inputProps = {
  label?: string;
  setValue?: Function;
  lines?: number;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
};

const SendInputField = ({
  label,
  setValue,
  lines,
  value,
  placeholder,
  disabled,
}: inputProps) => {
  return (
    <View style={styles.boxSt}>
      <Text
        style={[
          GLOBAL_STYLES.textPrimaryMedium10,
          darkTheme()
            ? {color: COLORS.white}
            : {color: COLORS.heading_label_color},
        ]}>
        {label}
      </Text>
      <TextInput
        style={[GLOBAL_STYLES.textPrimaryMedium13, {letterSpacing: 0.5}]}
        value={value}
        placeholder={placeholder}
        onChangeText={value => (setValue ? setValue(value) : null)}
        numberOfLines={lines}
        editable={!disabled}
      />
    </View>
  );
};

export default SendInputField;

const styles = StyleSheet.create({
  boxSt: {
    borderWidth: 0.3,
    borderRadius: 10,
    paddingTop: 7,
    paddingBottom: 6,
    paddingStart: 10,
    paddingEnd: 10,
  },
});
