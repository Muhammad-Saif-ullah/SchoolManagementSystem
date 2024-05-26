import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ViewFeeStatusScreen = () => {
  const [feeStatus, setFeeStatus] = useState([]);

  useEffect(() => {
    const fetchFeeStatus = async () => {
      try {
        const snapshot = await firestore()
          .collection('students')
          .get();

        const students = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          feeStatus: doc.data().feeStatus,
        }));

        setFeeStatus(students);
      } catch (error) {
        console.error('Error fetching fee status:', error);
        Alert.alert('Error', 'An error occurred. Check console.');
      }
    };

    fetchFeeStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {feeStatus.map((student, index) => (
          <View key={index} style={styles.studentContainer}>
            <Text style={styles.headerText}>Student Name: {student.name}</Text>
            <Text style={styles.headerText}>Email: {student.email}</Text>
            <Text>Class: {student.feeStatus.class}</Text>
            <Text>Amount Due: {student.feeStatus.amountDue}</Text>
            <Text>Amount Paid: {student.feeStatus.amountPaid}</Text>
            <Text>Payable Amount: {student.feeStatus.payableAmount}</Text>
            <Text>Payment Date: {student.feeStatus.paymentDate}</Text>
            <Text>Late Fees: {student.feeStatus.lateFees ? 'Yes' : 'No'}</Text>
            <Text>Remarks: {student.feeStatus.remarks}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  studentContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ViewFeeStatusScreen;
