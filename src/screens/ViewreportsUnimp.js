import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { db } from '../../firebase';

export default function ViewReports() {
  const [ageRecords, setAgeRecords] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('ageRecords').onSnapshot(snapshot => {
      const ageRecordsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAgeRecords(ageRecordsData);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Age Records</Text>
      <FlatList
        data={ageRecords}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Text>Registration No: {item.registrationNo}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Father Name: {item.fatherName}</Text>
            <Text>Date of Birth: {item.dateOfBirth}</Text>
            <Text>Age: {item.age}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  record: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
});