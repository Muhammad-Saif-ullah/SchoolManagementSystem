import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colors from '../styles/colors';

const ViewMarks = ({ route }) => {
  const { regNo } = route.params;
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarksAndTotals = async () => {
      try {
        const studentMarksRef = firestore().collection('Students').doc(regNo).collection('Marks');
        const subjectsRef = firestore().collection('Subjects');
        const studentMarksSnapshot = await studentMarksRef.get();
        const subjectsSnapshot = await subjectsRef.get();

        const subjectsData = subjectsSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});

        const marksData = studentMarksSnapshot.docs.map(doc => {
          const { FinalTerm, FirstTerm, MidTerm } = doc.data();
          const subjectData = subjectsData[doc.id];
          
          if (!subjectData) {
            return {
              subject: doc.id,
              FirstTerm: { obtained: FirstTerm, total: 0 },
              MidTerm: { obtained: MidTerm, total: 0 },
              FinalTerm: { obtained: FinalTerm, total: 0 }
            };
          }

          const marksDistribution = subjectData.marksDistribution;

          return {
            subject: doc.id,
            FirstTerm: { obtained: FirstTerm, total: marksDistribution[0] },
            MidTerm: { obtained: MidTerm, total: marksDistribution[1] },
            FinalTerm: { obtained: FinalTerm, total: marksDistribution[2] }
          };
        });

        setMarksData(marksData);
      } catch (error) {
        console.error('Error fetching marks and totals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarksAndTotals();
  }, [regNo]);

  const renderItem = ({ item }) => (
    <View style={styles.marksBox}>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.marks}>First Term: {item.FirstTerm.obtained}/{item.FirstTerm.total}</Text>
      <Text style={styles.marks}>Mid Term: {item.MidTerm.obtained}/{item.MidTerm.total}</Text>
      <Text style={styles.marks}>Final Term: {item.FinalTerm.obtained}/{item.FinalTerm.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marks</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={marksData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.subject}-${index}`}
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
  marksBox: {
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

export default ViewMarks;
