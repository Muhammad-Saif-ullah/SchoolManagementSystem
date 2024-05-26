import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colors from '../styles/colors';

const SyllabusSubjects = ({ route, navigation }) => {
  const { regNo } = route.params;
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState('');

  const getClassNumber = (admissionClass) => {
    switch (admissionClass) {
      case 'Classes/Class 1':
        return 'Class 1';
      case 'Classes/Class 2-3':
      case 'Classes/Class 2':
      case 'Classes/Class 3':
        return 'Class 2-3';
      case 'Classes/Class 4-5':
      case 'Classes/Class 4':
      case 'Classes/Class 5':
        return 'Class 4-5';
      case 'Classes/Class 6,7,8':
      case 'Classes/Class 6':
      case 'Classes/Class 7':
      case 'Classes/Class 8':
        return 'Class 6,7,8';
      case 'Classes/Nursery':
        return 'Nursery';
      case 'Classes/Prep':
        return 'Prep';
      default:
        return 'Class 8';
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const studentDoc = await firestore().collection('Students').doc(regNo).get();
        if (studentDoc.exists) {
          const admissionClassRef = studentDoc.data().AdmissionClass;
          const admissionClass = getClassNumber(admissionClassRef.path);
          setClassName(admissionClass);

          const classDoc = await firestore().collection('Classes').doc(admissionClass).get();
          if (classDoc.exists) {
            const subjects = classDoc.data().Subjects || [];
            setSubjects(subjects);
          }
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [regNo]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ViewSyllabus', { subject: item, className })}
    >
      <Text style={styles.subjectText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Syllabus Subjects</Text>
      <Text style={styles.classText}>Class: {className}</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={subjects}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
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
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subjectText: {
    fontSize: 18,
    color: colors.primary,
  },
});

export default SyllabusSubjects;
