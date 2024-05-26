import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colors from '../styles/colors';

const ViewTimeTable = ({route}) => {
  const {regNo} = route.params;
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState('');

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('Students')
          .doc(regNo)
          .get();

        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          const admissionClass = data?.AdmissionClass;
          const classNumber = getClassNumber(admissionClass);
          setClassName(classNumber);
          const imageUrl = `https://raw.githubusercontent.com/Muhammad-Saif-ullah/images/master/class_${classNumber}_timetable.png`;
          setClassData(imageUrl);
        } else {
          const defaultImageUrl =
            'https://raw.githubusercontent.com/Muhammad-Saif-ullah/images/master/class_8_timetable.png';
          setClassData(defaultImageUrl);
        }
      } catch (error) {
        console.error('Error fetching class data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [regNo]);

  const getClassNumber = admissionClass => {
    switch (admissionClass) {
      case 'Nursery':
        return '1';
      case 'Prep':
        return '1';
      case 'Class 1':
        return '1';
      case 'Class 2-3':
        return '3';
      case 'Class 2':
        return '2';
      case 'Class 3':
        return '3';
      case 'Class 4-5':
        return '5';
      case 'Class 4':
        return '4';
      case 'Class 5':
        return '5';
      case 'Class 6,7,8':
        return '7';
      case 'Class 6':
        return '6';
      case 'Class 7':
        return '7';
      case 'Class 8':
        return '8';
      default:
        return '8';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TimeTable</Text>
      <Text style={styles.classText}>Class: {className}</Text>
      <View style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Image
            source={{uri: classData}}
            style={styles.image}
            resizeMode="contain"
          />
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
