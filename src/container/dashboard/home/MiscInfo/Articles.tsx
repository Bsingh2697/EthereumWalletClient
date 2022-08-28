import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

type tabDataType = {
  index: number;
};

const Articles = ({index}: tabDataType) => {
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    if (index == 0) {
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
        console.log(response.data);
        setdata(response.data.news);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <View>
      <Text>Articles</Text>
    </View>
  );
};

export default Articles;

const styles = StyleSheet.create({});
