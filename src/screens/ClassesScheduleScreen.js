import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ClassesScheduleScreen = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      setLoading(true);
      try {
        const user = auth().currentUser;
        if (user) {
          console.log('Current user email:', user.email);  // Log current user email
          const teacherDoc = await firestore().collection('Teachers').doc(user.email).get();
          if (teacherDoc.exists) {
            const data = teacherDoc.data();
            setTeacherData(data);
            console.log('Teacher data:', data);  // Log teacher data

            // Fetch classes
            const classPromises = Array.isArray(data.AssignedClasses) ? data.AssignedClasses.map(classRef => classRef.id) : [];
            const classNames = await Promise.all(classPromises);
            setClasses(classNames);
            console.log('Class names:', classNames);  // Log class names

            // Fetch subjects
            const subjectPromises = Array.isArray(data.Subjects) ? data.Subjects.map(subjectRef => subjectRef.id) : [];
            const subjectNames = await Promise.all(subjectPromises);
            setSubjects(subjectNames);
            console.log('Subject names:', subjectNames);  // Log subject names
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error("Error fetching teacher data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        teacherData && (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Name: {teacherData.Name}</Text>
            <Text style={styles.dataText}>Email: {auth().currentUser.email}</Text>
            <Text style={styles.dataText}>Classes:</Text>
            <FlatList
              data={classes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Text style={styles.dataText}>- {item}</Text>}
            />
            <Text style={styles.dataText}>Subjects:</Text>
            <FlatList
              data={subjects}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Text style={styles.dataText}>- {item}</Text>}
            />
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    marginTop: 20,
    width: '80%',
  },
  dataText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ClassesScheduleScreen;
