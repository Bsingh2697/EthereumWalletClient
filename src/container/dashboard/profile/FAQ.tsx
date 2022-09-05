import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OuterHeader from '../../../components/headers/OuterHeader';
import {icons} from '../../../utils/constants/assets';
import {FaqProps} from '../../../navigation/types';
import {darkTheme} from '../../../utils/globalFunctions';
import {GLOBAL_STYLES} from '../../../utils/globalStyles';
import {COLORS} from '../../../utils/constants/colors';

const FAQ = ({navigation}: FaqProps) => {
  const FaqData = require('../../../utils/faq/Faq.json');

  return (
    <OuterHeader
      leftBackground={icons.encircle}
      leftIcon={icons.outerHeaderLogo}
      leftPress={() => console.log('Left Press')}
      rightBackground={icons.encircle}
      rightIcon={darkTheme() ? icons.cross_white : icons.cross}
      rightPress={() => navigation.goBack()}
      centerText={'FAQ'}>
      <FlatList
        data={FaqData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginHorizontal: 20, paddingVertical: 20}}
        renderItem={({item}) => (
          <View>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryMedium20,
                {
                  color: COLORS.gray_shade_two,
                },
              ]}>
              {item?.question}
            </Text>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryRegular12,
                {color: COLORS.gray_shade_three},
              ]}>
              {item?.answer}
            </Text>
          </View>
        )}
      />
    </OuterHeader>
  );
};

export default FAQ;

const styles = StyleSheet.create({});
