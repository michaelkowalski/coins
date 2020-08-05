import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

import {getTicker} from '../../utilities/getCurrencies';

const Currency = ({
  item,
}: {
  item: {name: string; id: string; symbol: string};
}) => {
  const [additional, setAdditional] = useState(null);

  useEffect(() => {
    console.log(`+ MOUNT ${item.name}`, item);

    (async () => {
      let firstTry, secondTry;

      firstTry = await getTicker(item.id);
      if (firstTry.error) {
        console.log('RETRYING');
        setTimeout(async () => {
          secondTry = await getTicker(item.id);
          if (secondTry.error) {
          } else {
            setAdditional(secondTry);
            console.log('HAVE DATA SECOND TIME', secondTry);
          }
        }, 2000);
      } else {
        setAdditional(firstTry);
        console.log('HAVE DATA', firstTry);
      }
    })();

    return () => {
      console.log(`- UNMOUNT ${item.name}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Text>{`${item.name} ${item.symbol}`}</Text>
      {/* @ts-ignore */}
      <Text>
        {additional // @ts-ignore
          ? `${additional.symbol}: ${additional.price_usd} USD`
          : 'loading...'}
      </Text>
    </>
  );
};

export default Currency;
