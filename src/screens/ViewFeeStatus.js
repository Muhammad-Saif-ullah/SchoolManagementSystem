import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colors from '../styles/colors';

const ViewFeeStatus = ({ route }) => {
  const { regNo } = route.params;
  const [feeStatus, setFeeStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeStatus = async () => {
      try {
        const studentDoc = await firestore().collection('Students').doc(regNo).get();
        if (studentDoc.exists) {
          const feeStatusData = studentDoc.data().FeeStatus;
          console.log('Fee status data:', feeStatusData);
          setFeeStatus(feeStatusData);
        } else {
          console.error('Student document does not exist for regNo:', regNo);
        }
      } catch (error) {
        console.error('Error fetching fee status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeStatus();
  }, [regNo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fee Status</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        feeStatus ? (
          <View style={styles.statusContainer}>
            <Text style={styles.label}>Amount Due:</Text>
            <Text style={styles.value}>{feeStatus.AmountDue}</Text>
            <Text style={styles.label}>Amount Paid:</Text>
            <Text style={styles.value}>{feeStatus.AmountPaid}</Text>
            <Text style={styles.label}>Late Fees:</Text>
            <Text style={styles.value}>{feeStatus.LateFees ? 'Yes' : 'No'}</Text>
            <Text style={styles.label}>Payable Amount:</Text>
            <Text style={styles.value}>{feeStatus.PayableAmount}</Text>
            <Text style={styles.label}>Payment Date:</Text>
            <Text style={styles.value}>{feeStatus.PaymentDate}</Text>
            <Text style={styles.label}>Remarks:</Text>
            <Text style={styles.value}>{feeStatus.Remarks}</Text>
          </View>
        ) : (
          <Text style={styles.loadingText}>No fee status found for this student</Text>
        )
      )}
    </View>
  );
};

{/* feeStatus && ( */ }
{/* ) */ }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: colors.primary,
    alignSelf: 'center',
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
});

export default ViewFeeStatus;
