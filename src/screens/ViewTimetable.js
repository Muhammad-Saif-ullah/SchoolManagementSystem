import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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
          const studentData = studentDoc.data();
          const admissionClassRef = studentData.AdmissionClass;
          
          if (admissionClassRef) {
            const classPathParts = admissionClassRef._documentPath._parts;
            const classNumber = classPathParts[classPathParts.length - 1].split(' ')[1];
            setClassName(classNumber);
            
            const uri = await storage().ref(`class_${classNumber}_timetable.png`).getDownloadURL();
            setTimetableUri(uri);
          } else {
            console.error('AdmissionClass is undefined for student:', regNo);
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
          timetableUri && <Image source={{ uri: timetableUri }} style={styles.image} resizeMode="contain" />
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
