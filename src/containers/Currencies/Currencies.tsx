import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import Currency from '../../components/Currency/Currency';

import getCurrencies from '../../../src/utilities/getCurrencies';

const Currencies = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    (async () => {
      const coinpaprica = await getCurrencies();
      setCurrencies(coinpaprica);
    })();
  }, []);

  console.log(currencies);

  return (
    <>
      <FlatList data={currencies} renderItem={Currency} />
    </>
  );
};

export default Currencies;
