import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {GLOBAL_STYLES} from '../../../../utils/globalStyles';
import {showToast} from '../../../../libs/ToastConfig';
import {STRING_CONSTANTS} from '../../../../utils/constants/stringConstants';
import {ToastType} from '../../../../components/toast/collection';
import LottieView from 'lottie-react-native';

type tabDataType = {
  index: number;
};

const Articles = ({index}: tabDataType) => {
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    if (index == 1) {
      fetchArticles();
    }
  }, [index]);

  const fetchArticles = () => {
    const options = {
      method: 'GET',
      url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-analysis',
      params: {
        pair_ID: '1057391',
        time_utc_offset: '28800',
        lang_ID: '1',
        page: '1',
      },
      headers: {
        'X-RapidAPI-Key': '5252b61832msh0810f8b4facf30ap1ea38fjsn92b51ece64b1',
        'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log('Articles :', response.data.data[0].screen_data.analysis);
        setdata(response.data.data[0].screen_data.analysis);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const openArticle = (url: string) => {
    console.log('URL : ', url);

    try {
      Linking.openURL(url);
    } catch (e) {
      showToast(
        STRING_CONSTANTS.errors.cannotOpenUrl,
        `${STRING_CONSTANTS.errors.errorOpeningUrl}`,
        ToastType.ERROR,
      );
    }
  };

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <Pressable
          onPress={() => openArticle(item?.article_href)}
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginBottom: 10,
          }}>
          <Image
            style={{height: 60, width: 60, marginEnd: 10, borderRadius: 10}}
            source={{uri: item?.related_image}}
          />
          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={[GLOBAL_STYLES.textPrimaryMedium11]}>
              {item?.article_title}
            </Text>
            <Text
              style={[
                GLOBAL_STYLES.textPrimaryRegular10,
                {includeFontPadding: false},
              ]}>
              ~ {item?.article_author}
            </Text>
            <Text numberOfLines={2} style={[GLOBAL_STYLES.textPrimaryRegular9]}>
              {item?.article_data
                ? item?.article_data.replace(
                    /<\/?([a-zA-Z]\s?)*?([a-zA-Z]+?=\s?".*")*?([\s/]*?)>/gi,
                    '',
                  )
                : 'Click here to view full article!'}
            </Text>
          </View>
        </Pressable>
      )}
      ListEmptyComponent={() => (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            source={{
              uri: 'https://assets10.lottiefiles.com/packages/lf20_yetxuujw.json',
            }}
            autoPlay
            loop
            style={{height: 100, width: 100}}
          />
        </View>
      )}
    />
  );
};

export default Articles;

const styles = StyleSheet.create({});
