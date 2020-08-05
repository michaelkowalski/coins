import React, {useEffect, useState} from 'react';
import {Dimensions, View, ActivityIndicator} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import Currency from '../../components/Currency/Currency';

import {getCurrencies} from '../../utilities/getCurrencies';

const ViewTypes = {DEFAULT: 0};

const {width} = Dimensions.get('window');

const dataProvider = new DataProvider((r1, r2) => {
  return r1 !== r2;
});

const layoutProvider = new LayoutProvider(
  () => {
    return ViewTypes.DEFAULT;
  },
  (type, dim) => {
    switch (type) {
      case ViewTypes.DEFAULT:
        dim.width = width;
        dim.height = 50;
        break;
      default:
        dim.width = 0;
        dim.height = 0;
    }
  },
);

const Currencies = () => {
  const [currencies, setCurrencies] = useState(dataProvider.cloneWithRows([]));

  useEffect(() => {
    (async () => {
      const coinpaprica = await getCurrencies();
      setCurrencies(dataProvider.cloneWithRows(coinpaprica));
    })();
  }, []);

  if (currencies.getSize() === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={currencies}
      rowRenderer={(type, data) => <Currency item={data} />}
    />
  );
};

export default Currencies;
