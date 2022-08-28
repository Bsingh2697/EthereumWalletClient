import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {Ref, useImperativeHandle, useRef, useState} from 'react';
import {COLORS} from '../../utils/constants/colors';
import {darkTheme} from '../../utils/globalFunctions';
import {GLOBAL_STYLES} from '../../utils/globalStyles';
import {useTheme} from '@react-navigation/native';

interface InputProps {
  initialValue?: string;
  placeholder?: string;
  rightIcon?: ImageSourcePropType;
  rightText?: string;
  onRightIconPress?: Function;
  disabled?: boolean;
  label?: string;
  setFormValue?: Function;
  showContent?: boolean;
  onTap?: Function;
  onSubmitEditing?: Function;
  fixedValue?: string;
  customViewStyle?: any;
}

const InputField = (
  {
    initialValue,
    placeholder,
    rightIcon,
    rightText,
    onRightIconPress,
    disabled,
    label,
    setFormValue,
    showContent,
    onTap,
    onSubmitEditing,
    fixedValue,
  }: InputProps,
  ref: React.Ref<any>,
) => {
  const [inputValue, setinputValue] = useState(initialValue);

  const {colors} = useTheme();

  const textInputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    value: () => inputValue,
    focus: () => textInputRef.current?.focus(),
  }));

  return (
    <Pressable
      onPress={() => (onTap ? onTap() : {})}
      style={[[styles.inputView, {borderColor: colors.border}]]}>
      <Pressable onPress={() => (onTap ? onTap() : {})} style={styles.viewOne}>
        <View>
          <Text
            style={[
              GLOBAL_STYLES.textPrimaryMedium10,
              {color: COLORS.gray_shade_two},
            ]}>
            {label}
          </Text>
        </View>
        <View>
          <TextInput
            ref={textInputRef}
            selectTextOnFocus={true}
            editable={!disabled}
            placeholder={placeholder}
            value={fixedValue ? fixedValue : inputValue}
            onChangeText={value => {
              setinputValue(value), setFormValue ? setFormValue(value) : {};
            }}
            style={[GLOBAL_STYLES.textPrimaryRegular12, styles.inputSt]}
            placeholderTextColor={COLORS.gray_shade_one}
            onPressIn={() => onTap && onTap()}
            secureTextEntry={showContent}
            autoComplete={'off'}
            autoCorrect={false}
            onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
          />
        </View>
      </Pressable>
      {rightIcon ? (
        <Pressable
          style={styles.viewTwo}
          onPress={() => (onRightIconPress ? onRightIconPress() : {})}>
          <Image source={rightIcon} />
        </Pressable>
      ) : (
        <Pressable onPress={() => (onRightIconPress ? onRightIconPress() : {})}>
          <Text style={[GLOBAL_STYLES.textPrimaryBold10]}>{rightText}</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default React.forwardRef(InputField);

const styles = StyleSheet.create({
  inputView: {
    borderWidth: 0.6,
    borderRadius: 5,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  viewOne: {
    flex: 1,
  },
  viewTwo: {},
  inputSt: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
