import { React, useState } from 'react';
import { View, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import colors from '../styles/colors';
import FormField from '../components/FormField';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const StudentRegistrationScreen = ({ navigation }) => {
  const [regNo, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [caste, setCaste] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [residence, setResidence] = useState('');
  const [password, setPassword] = useState('');
  const [remarks, setRemarks] = useState('');

  const registerStudent = () => {
    if (regNo.trim() === '' || regNo < 1 || regNo > 1000) {
      Alert.alert('Error', 'Please enter a valid registration number!');
      return;
    }

    const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(20\d{2})$/;
    if (!regex.test(dob)) {
      Alert.alert('Error', 'Please enter a valid date in DD/MM/YYYY format! Year should between 2000 and 2999.');
      return;
    }

    if (
      name.trim() === '' ||
      fatherName.trim() === '' ||
      caste.trim() === '' ||
      gender.trim() === '' ||
      occupation.trim() === '' ||
      residence.trim() === '' ||
      password.trim() === ''
    ) {
      Alert.alert('Error', 'Please fill all the fields!');
      return;
    }

    const email = `std${regNo}@school.com`;

    // Creating new login credentials for the new student
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('New Student credentials created!');

        // Adding student to the database
        firestore()
          .collection('students')
          .doc(email)
          .set({
            regNo: regNo,
            admissionDate: new Date().getDate(),
            name: name,
            dob: dob,
            gender: gender,
            fatherName: fatherName,
            caste: caste,
            occupation: occupation,
            residence: residence,
            email: email,
            password: password,
            remarks: remarks,
            admissionClass: "Not Assigned",
            feeStatus: {},
            marks: "Not Marked",
          })
          .then(() => {
            console.log('New Student Registration added!');
            Alert.alert('Registered', 'Student registered successfully!');
          })
          .catch((error) => {
            console.error('Error adding student: ', error);
            Alert.alert('Error', 'Error adding student!');

            return;
          });

        navigation.goBack();

      })
      .catch(error => {
        let message = 'An error occurred. Please try again.';
        switch (error.code) {
          case 'auth/email-already-in-use':
            message = 'This email address is already in use.';
            break;
          case 'auth/weak-password':
            message = 'The password is weak. Try a stronger one.';
            break;
        }
        Alert.alert('Error', message);
        console.error(error);

        return;
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormField label="Reg No (1-1000)" hook={setRegNo} keyboard={'numeric'} />
      <FormField label="Name" hook={setName} />
      <FormField label="Date of Birth (DD/MM/YYYY)" hook={setDob} />
      <FormField label="Gender" hook={setGender} />

      <FormField label="Father Name" hook={setFatherName} />
      <FormField label="Caste" hook={setCaste} />
      <FormField label="Occupation" hook={setOccupation} />
      <FormField label="Residence" hook={setResidence} />

      <FormField label="Password" hook={setPassword} />

      <FormField label="Remarks (if any)" hook={setRemarks} />

      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={registerStudent} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.secondary,
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '50%',
  },
});

export default StudentRegistrationScreen;
