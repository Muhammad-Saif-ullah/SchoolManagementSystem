import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colors from '../styles/colors';

const ViewTimeTable = ({ route }) => {
  const { regNo } = route.params;
  const [timetableUri, setTimetableUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState('');

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const studentDoc = await firestore().collection('Students').doc(regNo).get();
        if (studentDoc.exists) {
          const admissionClassRef = studentDoc.data().AdmissionClass;
          if (admissionClassRef && admissionClassRef.path) {
            const classNumber = admissionClassRef.path.split('/').pop();
            setClassName(classNumber);

            const timetableDoc = await firestore().collection('TimeTable').doc(classNumber).get();
            if (timetableDoc.exists) {
              const uri = timetableDoc.data().uri;
              setTimetableUri(uri);
            } else {
              console.error('TimeTable document does not exist for class:', classNumber);
            }
          } else {
            console.error('AdmissionClass reference is invalid:', admissionClassRef);
          }
        } else {
          console.error('Student document does not exist for regNo:', regNo);
        }
      } catch (error) {
        console.error('Error fetching timetable:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeTable();
  }, [regNo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TimeTable</Text>
      <Text style={styles.classText}>Class: {className}</Text>
      <View style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Image source={{ uri: timetableUri }} style={styles.image} resizeMode="contain" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  classText: {
    fontSize: 18,
    color: '#4169E1',
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ViewTimeTable;
