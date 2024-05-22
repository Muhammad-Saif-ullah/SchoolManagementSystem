import React from 'react';
import {Text, TextInput} from 'react-native';

const MyComponent = ({label, hook, value}) => {
  return (
    <>
      <Text>{label}</Text>
      <TextInput
        style={{borderColor: 'black', borderWidth: 1, width: 200}}
        onChangeText={hook}
        value={value}
      />
    </>
  );
};

export default MyComponent;
