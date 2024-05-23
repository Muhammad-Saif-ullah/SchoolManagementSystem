import React from 'react';
import {View, Button, StyleSheet, ScrollView} from 'react-native';
import colors from '../styles/colors';
import FormField from '../components/FormField';

const AddNewFeeStatusScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormField label="Reg No" />
      <FormField label="Name" />
      <FormField label="Amount Due" />
      <FormField label="Amount Paid" />
      <FormField label="Payable Amount" />
      <FormField label="Payment Date" placeholder={'DD/MM/YYYY'} />
      <FormField label="Late Fees" />
      <FormField label="Remarks" />
      <View style={styles.buttonContainer}>
        <Button title="Add" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.secondary,
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '50%',
  },
});

export default AddNewFeeStatusScreen;
