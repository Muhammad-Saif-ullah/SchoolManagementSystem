import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

const FormField = ({ label, placeholder, hook, value, keyboard }) => (
  <View style={styles.inputGroup}>
    <Text>{label}</Text>
    <TextInput
      style={[styles.input]}
      placeholder={placeholder}
      onChangeText={hook}
      keyboardType={keyboard}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  inputGroup: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    borderRadius: 15,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    marginTop: 5,
    width: '100%',
  },
});

export default FormField;
