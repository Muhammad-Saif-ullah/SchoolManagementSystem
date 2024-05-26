import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import colors from '../styles/colors';

const ViewMarks = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const marksRef = firestore().collection('marks');
        const snapshot = await marksRef.get();
        const marksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMarks(marksData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching marks: ', error);
        setLoading(false);
      }
    };

    fetchMarks();
 }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={marks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`Marks: ${item.marks}`}
            left={props => <List.Icon {...props} icon="clipboard" />}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default ViewMarks;
