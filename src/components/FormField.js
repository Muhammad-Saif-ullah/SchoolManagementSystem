import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import colors from '../styles/colors';

const FormField = ({ label, placeholder, hook, value, keyboard }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
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
  // input: {
  //   borderRadius: 15,
  //   borderWidth: 1,
  //   height: 40,
  //   paddingHorizontal: 10,
  //   marginTop: 5,
  //   width: '100%',
  // },
  label: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#E8F0FE',
    color: '#1E90FF',
  },

});

export default FormField;
