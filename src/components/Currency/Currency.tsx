import React from 'react';
import {Text} from 'react-native';

const Currency = ({item}: {item: {name: string}}) => {
  return (
    <>
      <Text>{item.name}</Text>
    </>
  );
};

export default Currency;
