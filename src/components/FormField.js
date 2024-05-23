import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const FormField = ({label, placeholder}) => (
  <View style={styles.inputGroupWide}>
    <Text>{label}</Text>
    <TextInput style={styles.wideInput} placeholder={placeholder} />
  </View>
);

const styles = StyleSheet.create({
  inputGroupWide: {
    width: '100%',
    marginBottom: 10,
  },
  wideInput: {
    borderRadius: 15,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    marginTop: 5,
    width: '100%',
  },
});

export default FormField;
