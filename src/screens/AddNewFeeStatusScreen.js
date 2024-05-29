import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colors from '../styles/colors';
import FormField from '../components/FormField';
import { SelectList } from 'react-native-dropdown-select-list';

const AddNewFeeStatusScreen = ({ route, navigation }) => {
  const { student } = route.params || {};

  const [regNo, setRegNo] = useState(student?.regno || '');
  const [amountDue, setAmountDue] = useState(student?.feeStatus?.AmountDue || '');
  const [amountPaid, setAmountPaid] = useState(student?.feeStatus?.AmountPaid || '');
  const [payableAmount, setPayableAmount] = useState(student?.feeStatus?.PayableAmount || '');
  const [paymentDate, setPaymentDate] = useState(student?.feeStatus?.PaymentDate || '');
  const [lateFees, setLateFees] = useState(student?.feeStatus?.LateFees ? 'true' : 'false');
  const [remarks, setRemarks] = useState(student?.feeStatus?.Remarks || '');

  const [regNoList, setRegNoList] = useState([]);

  useEffect(() => {
    firestore()
      .collection('Students')
      .get()
      .then((querySnapshot) => {
        const regNoList = [];
        querySnapshot.forEach((doc) => {
          if (!doc.data().FeeStatus) {
            regNoList.push(doc.id);
          }
        });

        const regNoListData = regNoList.map((regNo, index) => {
          return { key: index.toString(), value: regNo };
        });

        setRegNoList(regNoListData);
      });
  }, []);

  const addNewFeeStatus = () => {
    if (regNo === '') {
      Alert.alert('Error', 'Please select a Reg No');
      return;
    }

    if (amountDue === '' || amountPaid === '' || payableAmount === '' || paymentDate === '' || lateFees === '') {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    if (amountDue < 0 || amountPaid < 0 || payableAmount < 0 || lateFees < 0) {
      Alert.alert('Error', 'Please enter positive numbers');
      return;
    }

    const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(20\d{2})$/;

    if (!regex.test(paymentDate)) {
      Alert.alert('Error', 'Please enter valid date in DD/MM/YYYY format. Year should be between 2000 and 2999.');
      return;
    }

    Alert.alert('Adding New Fee Status', 'Please wait while we add new fee status...');

    firestore()
      .collection('Students')
      .doc(regNo)
      .update({
        FeeStatus: {
          AmountDue: amountDue,
          AmountPaid: amountPaid,
          PayableAmount: payableAmount,
          PaymentDate: paymentDate,
          LateFees: lateFees === 'true',
          Remarks: remarks,
        },
      })
      .then(() => {
        Alert.alert('Done', 'New Fees Status added successfully');

        if (student) {
          navigation.pop(2);
        } else {
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error('Error adding new fees status : ', error);
        Alert.alert('Error', 'An error occurred. Check console.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.selectListLabel}>Reg No</Text>
      <SelectList
        setSelected={setRegNo}
        data={regNoList}
        save="value"
        boxStyles={styles.selectListBoxStyle}
        inputStyles={styles.selectListInputStyle}
        defaultOption={{ key: regNo, value: regNo }}
      />
      <FormField label="Amount Due" hook={setAmountDue} value={amountDue} />
      <FormField label="Amount Paid" hook={setAmountPaid} value={amountPaid} />
      <FormField label="Payable Amount" hook={setPayableAmount} value={payableAmount} />
      <FormField label="Payment Date (DD/MM/YYYY)" hook={setPaymentDate} value={paymentDate} />
      <Text style={styles.selectListLabel}>Late Fees</Text>
      <SelectList
        setSelected={setLateFees}
        data={[{ key: 'true', value: 'true' }, { key: 'false', value: 'false' }]}
        save="value"
        boxStyles={styles.selectListBoxStyle}
        inputStyles={styles.selectListInputStyle}
        defaultOption={{ key: lateFees, value: lateFees }}
      />
      <FormField label="Remarks" hook={setRemarks} value={remarks} />
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
  selectListLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: colors.primary,
    marginBottom: 10,
  },
  selectListBoxStyle: {
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#E8F0FE',
    width: '100%',
    color: '#1E90FF',
  },
  selectListInputStyle: {
    color: '#1E90FF',
  }
});

export default AddNewFeeStatusScreen;
