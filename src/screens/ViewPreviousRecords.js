import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../styles/colors';

const generateDummyRecords = () => {
  const records = [];
  const subjects = ['Math', 'English', 'Computer', 'Nazra-e-Quran', 'Social Studies'];
  for (let i = 1; i <= 3; i++) {
    subjects.forEach(subject => {
      records.push({
        subject,
        year: `Year ${2020 + i}`,
        firstTerm: {
          obtained: Math.floor(Math.random() * 100),
          total: 100,
        },
        midTerm: {
          obtained: Math.floor(Math.random() * 100),
          total: 100,
        },
        finalTerm: {
          obtained: Math.floor(Math.random() * 100),
          total: 100,
        },
      });
    });
  }
  return records;
};

const ViewPreviousRecords = ({ route }) => {
  const { regNo } = route.params;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRecords(generateDummyRecords());
      setLoading(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.recordBox}>
      <Text style={styles.subject}>{item.subject} - {item.year}</Text>
      <Text style={styles.marks}>First Term: {item.firstTerm.obtained}/{item.firstTerm.total}</Text>
      <Text style={styles.marks}>Mid Term: {item.midTerm.obtained}/{item.midTerm.total}</Text>
      <Text style={styles.marks}>Final Term: {item.finalTerm.obtained}/{item.finalTerm.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Records</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={records}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.subject}-${item.year}-${index}`}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  recordBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  marks: {
    fontSize: 16,
    color: '#555',
  },
});

export default ViewPreviousRecords;
