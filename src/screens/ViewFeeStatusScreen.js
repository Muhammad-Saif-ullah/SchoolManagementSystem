import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-paper';
import colors from '../styles/colors';

const ViewFeeStatusScreen = ({ navigation }) => {
  const [feeStatus, setFeeStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFeeStatus = async () => {
      try {
        const snapshot = await firestore()
          .collection('Students')
          .get();

        const studentsWithFeeStatus = snapshot.docs
          .map(doc => ({
            regno: doc.id,
            name: doc.data().Name,
            email: doc.data().Email,
            feeStatus: doc.data().FeeStatus,
          }))
          .filter(student => student.feeStatus !== undefined);

        setFeeStatus(studentsWithFeeStatus);
      } catch (error) {
        console.error('Error fetching fee status:', error);
        Alert.alert('Error', 'An error occurred. Check console.');
      }
      finally {
        setLoading(false);
      }
    };

    fetchFeeStatus();
  }, []);

  const handleEdit = (student) => {
    console.log('Student:', student);
    navigation.navigate('AddNewFeeStatusScreen', { student });
  };

  const handleDelete = async (regno) => {
    try {
      await firestore()
        .collection('Students')
        .doc(regno)
        .update({
          FeeStatus: firestore.FieldValue.delete()
        });

      setFeeStatus(prevState => prevState.filter(student => student.regno !== regno));
      Alert.alert('Success', 'Fee Status deleted successfully');
    } catch (error) {
      console.error('Error deleting fee status:', error);
      Alert.alert('Error', 'An error occurred. Check console.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Fee Status found: {feeStatus.length}</Text>
        </View>
        {loading && <ActivityIndicator size="large" color={colors.primary} />}
        {feeStatus.map((student, index) => (
          <View key={index} style={styles.studentContainer}>
            <Text style={styles.boldText}>Student Name: {student.name}</Text>
            <Text style={styles.boldText}>Email: {student.email}</Text>
            <Text>Amount Due: {student.feeStatus.AmountDue}</Text>
            <Text>Amount Paid: {student.feeStatus.AmountPaid}</Text>
            <Text>Payable Amount: {student.feeStatus.PayableAmount}</Text>
            <Text>Payment Date: {student.feeStatus.PaymentDate}</Text>
            <Text>Late Fees: {student.feeStatus.LateFees ? 'Yes' : 'No'}</Text>
            <Text>Remarks: {student.feeStatus.Remarks}</Text>
            <Button mode="outlined" style={{ marginTop: 10, borderColor: colors.primary }} onPress={() => handleEdit(student)}>
              Edit Fee Status
            </Button>
            <Button mode="contained" style={{ marginTop: 10, backgroundColor: colors.primary }} onPress={() => handleDelete(student.regno)}>
              Delete Fee Status
            </Button>
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
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  studentContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ViewFeeStatusScreen;
