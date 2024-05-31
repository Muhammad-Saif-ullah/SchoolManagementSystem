import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import colors from '../styles/colors';

const getClassname = (classNumber) => {
  switch (classNumber) {
    case 'Nursery':
      return 'nursery_syllabus.png';
    case 'Prep':
      return 'prep_syllabus.png';
    case 'Class 1':
      return 'class_1_syllabus.png';
    case 'Class 2':
      return 'class_2_syllabus.png';
    case 'Class 3':
      return 'class_3_syllabus.png';
    case 'Class 4':
      return 'class_4_syllabus.png';
    case 'Class 5':
      return 'class_5_syllabus.png';
    case 'Class 6':
      return 'class_6_syllabus.png';
    case 'Class 7':
      return 'class_7_syllabus.png';
    case 'Class 8':
      return 'class_8_syllabus.png';
    default:
      return null;
  }
};

const ViewSyllabus = ({ route }) => {
  const { regNo } = route.params;
  const [syllabusUri, setSyllabusUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState('');

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const studentDoc = await firestore().collection('Students').doc(regNo).get();
        if (studentDoc.exists) {
          const admissionClassRef = studentDoc.data().AdmissionClass;
          const classPathParts = admissionClassRef._documentPath._parts;
          const classRefName = getClassname(classPathParts[classPathParts.length - 1]);

          const uri = await storage().ref(classRefName).getDownloadURL();
          setSyllabusUri(uri);
        } else {
          console.error('Student document does not exist for regNo:', regNo);
        }
      } catch (error) {
        console.error('Error fetching syllabus:', error);
        Alert.alert('Error', 'Failed to fetch syllabus. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, [regNo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Syllabus</Text>
      <Text style={styles.classText}>Class: {className}</Text>
      <View style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          syllabusUri && <Image source={{ uri: syllabusUri }} style={styles.image} resizeMode="contain" />
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

export default ViewSyllabus;
