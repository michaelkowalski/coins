import React, {useEffect} from 'react';
import {Text} from 'react-native';

const Currency = ({item}: {item: {name: string}}) => {
  useEffect(() => {
    console.log(`+ MOUNT ${item.name}`);

    return () => {
      console.log(`- UNMOUNT ${item.name}`);
    };
  }, [item]);

  return (
    <>
      <Text>{`${item.name} `}</Text>
    </>
  );
};

export default Currency;
