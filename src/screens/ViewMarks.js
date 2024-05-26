import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ViewMarks = ({ route }) => {
  const { regNo } = route.params;
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const marksSnapshot = await firestore()
          .collection(`Students/${regNo}/Marks`)
          .get();

        const marksData = marksSnapshot.docs.map(doc => {
          const { FirstTerm, MidTerm, FinalTerm } = doc.data();
          return {
            id: doc.id,
            subject: doc.id,
            FirstTerm,
            MidTerm,
            FinalTerm,
          };
        });

        setMarks(marksData);
      } catch (error) {
        console.error('Error fetching marks:', error);
      }
    };

    fetchMarks();
  }, [regNo]);

  const getTotalMarks = async (subjectName) => {
    try {
      const subjectDoc = await firestore().collection('Subjects').doc(subjectName).get();
      const marksDistribution = subjectDoc.data().marksDistribution;
      return marksDistribution;
    } catch (error) {
      console.error('Error fetching total marks:', error);
      return {
        FirstTermTotal: 0,
        MidTermTotal: 0,
        FinalTermTotal: 0,
      };
    }
  };

  const renderItem = ({ item }) => {
    const { subject, FirstTerm, MidTerm, FinalTerm } = item;
    const [firstTermTotal, setFirstTermTotal] = useState(0);
    const [midTermTotal, setMidTermTotal] = useState(0);
    const [finalTermTotal, setFinalTermTotal] = useState(0);

    useEffect(() => {
      const fetchTotalMarks = async () => {
        const totalMarks = await getTotalMarks(subject);
        setFirstTermTotal(totalMarks.FirstTermTotal);
        setMidTermTotal(totalMarks.MidTermTotal);
        setFinalTermTotal(totalMarks.FinalTermTotal);
      };

      fetchTotalMarks();
    }, [subject]);

    return (
      <View style={styles.item}>
        <Text style={styles.subjectText}>{subject}</Text>
        <View style={styles.marksContainer}>
          <Text>{`${FirstTerm} / ${firstTermTotal}`}</Text>
          <Text>{`${MidTerm} / ${midTermTotal}`}</Text>
          <Text>{`${FinalTerm} / ${finalTermTotal}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={marks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subjectText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  marksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ViewMarks;
