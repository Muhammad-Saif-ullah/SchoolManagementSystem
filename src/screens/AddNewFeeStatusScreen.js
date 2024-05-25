import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colors from '../styles/colors';
import FormField from '../components/FormField';

const AddNewFeeStatusScreen = ({ navigation }) => {
  const [regNo, setRegNo] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [payableAmount, setPayableAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [lateFees, setLateFees] = useState('');
  const [remarks, setRemarks] = useState('');

  const addNewFeeStatus = () => {
    firestore()
      .collection('students')
      .doc(`std${regNo}@school.com`)
      .update({
        feeStatus: {
          amountDue: amountDue,
          amountPaid: amountPaid,
          payableAmount: payableAmount,
          paymentDate: paymentDate,
          lateFees: lateFees,
          remarks: remarks,
        },
      })
      .then(() => {
        console.log(`New Fees Status added for ${regNo}!`);
        Alert.alert('Done', 'New Fees Status added successfully');
      })
      .catch((error) => {
        console.error('Error adding new fees status : ', error);
        Alert.alert('Error', 'An error occurred. Check console.');

        return;
      });

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormField label="Reg No" hook={setRegNo} />
      <FormField label="Amount Due" hook={setAmountDue} />
      <FormField label="Amount Paid" hook={setAmountPaid} />
      <FormField label="Payable Amount" hook={setPayableAmount} />
      <FormField label="Payment Date (DD/MM/YYYY)" hook={setPaymentDate} />
      <FormField label="Late Fees" hook={setLateFees} />
      <FormField label="Remarks" hook={setRemarks} />
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={addNewFeeStatus} />
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
