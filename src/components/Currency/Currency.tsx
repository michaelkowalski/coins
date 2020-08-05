import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

import {useRematchDispatch} from '../../utilities/useRematchDispatch';

const Currency = ({
  item,
}: {
  item: {name: string; id: string; symbol: string};
}) => {
  const {items} = useSelector((state) => ({
    // @ts-ignore
    items: state.currencies.items,
  }));

  const fetchTicker = useRematchDispatch(
    // @ts-ignore
    (dispatch) => dispatch.currencies.fetchTicker,
  );

  useEffect(() => {
    if (item.id) {
      fetchTicker(item.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <>
      <Text>{`${item.name} ${item.symbol}`}</Text>
      {/* @ts-ignore */}
      {items[item.id] && items[item.id].data && (
        <Text>{items[item.id].data.price_usd}</Text>
      )}
    </>
  );
};

export default Currency;
