import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

type tabDataType = {
  index: number;
};

const News = ({index}: tabDataType) => {
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    if (index == 0) {
      fetchNews();
    }
  }, [index]);

  const fetchNews = () => {
    const options = {
      method: 'GET',
      url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news',
      params: {
        pair_ID: '1057391',
        page: '1',
        time_utc_offset: '28800',
        lang_ID: '1',
      },
      headers: {
        'X-RapidAPI-Key': '5252b61832msh0810f8b4facf30ap1ea38fjsn92b51ece64b1',
        'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.news);
        setdata(response.data.news);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <View>
      <Text>News</Text>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({});
