import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';
import colors from '../styles/colors';

const ManageStudentsScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snapshot = await firestore().collection('Students').get();

        const allStudents = snapshot.docs
          .map(doc => ({
            regno: doc.id,
            name: doc.data().Name,
            email: doc.data().Email,
            gender: doc.data().Gender,
            fathername: doc.data().FatherName,
            caste: doc.data().Caste,
            occupation: doc.data().Occupation,
            residence: doc.data().Residence,
            admissiondate: doc.data().AdmissionDate,
            dob: doc.data().DOB,
            admissionclass: doc.data().AdmissionClass._documentPath._parts[1],
            remarks: doc.data().Remarks,
            password: doc.data().Password,
          }))
          .filter(student => student !== undefined);

        setStudents(allStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
        Alert.alert('Error', 'An error occurred. Check console.');
      }
      finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = student => {
    // Show student as json on console
    console.log('Student:', student);
    navigation.navigate('StudentRegistrationScreen', { student });
  };

  const handleDelete = async regno => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this student? Reg No: ' +
      regno +
      '. This action cannot be undone. Proceed with caution',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Alert.alert(
              'Deleting',
              'Please wait while we delete the student...',
            );

            auth()
              .signInWithEmailAndPassword(
                'std' + regno + '@school.com',
                students.find(student => student.regno === regno).password,
              )
              .then(() => {
                console.log('----------------------------------------------');
                console.log(
                  'Deleting auth credentials for user:',
                  auth().currentUser,
                );
                console.log('Deleting student:', regno);

                auth()
                  .currentUser.delete()
                  .then(() => {
                    console.log('Auth credentials deleted successfully!');
                    firestore()
                      .collection('Students')
                      .doc(regno)
                      .delete()
                      .then(() => {
                        setStudents(prevState =>
                          prevState.filter(student => student.regno !== regno),
                        );
                        Alert.alert('Success', 'Student deleted successfully');
                      })
                      .catch(error => {
                        console.log('Error deleting student: ', error);
                      });
                  })
                  .catch(error => {
                    console.log('Error deleting auth credentials: ', error);
                  });
              })
              .catch(error => {
                console.log('Error deleting auth credentials: ', error);
              });
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Students found: {students.length}
          </Text>
        </View>
        {loading && <ActivityIndicator size="large" color={colors.primary} />}
        {students.map((student, index) => (
          <View key={index} style={styles.studentContainer}>
            <Text style={styles.boldText}>Reg No: {student.regno}</Text>
            <Text style={styles.boldText}>Student Name: {student.name}</Text>
            <Text style={styles.boldText}>Email: {student.email}</Text>
            <Text style={styles.text}>Date of Birth: {student.dob}</Text>
            <Text style={styles.text}>Gender: {student.gender}</Text>
            <Text style={styles.text}>Father Name: {student.fathername}</Text>
            <Text style={styles.text}>Caste: {student.caste}</Text>
            <Text style={styles.text}>Occupation: {student.occupation}</Text>
            <Text style={styles.text}>Residence: {student.residence}</Text>
            <Text style={styles.text}>
              Admission Date: {student.admissiondate}
            </Text>
            <Text style={styles.text}>
              Admission Class: {student.admissionclass}
            </Text>
            <Text style={styles.text}>Remarks: {student.remarks}</Text>
            <Button
              mode="outlined"
              style={{ marginTop: 10, borderColor: colors.primary }}
              onPress={() => handleEdit(student)}>
              Edit Student
            </Button>
            <Button
              mode="contained"
              style={{ marginTop: 10, backgroundColor: colors.primary }}
              onPress={() => handleDelete(student.regno)}>
              Delete Student
            </Button>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  studentContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 5,
  },
});

export default ManageStudentsScreen;
