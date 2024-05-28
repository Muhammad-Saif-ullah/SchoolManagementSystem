import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import colors from '../styles/colors';
import FormField from '../components/FormField';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const classData = [
  { key: '1', value: 'Nursery' },
  { key: '2', value: 'Prep' },
  { key: '3', value: 'Class 1' },
  { key: '4', value: 'Class 2' },
  { key: '5', value: 'Class 3' },
  { key: '6', value: 'Class 4' },
  { key: '7', value: 'Class 5' },
  { key: '8', value: 'Class 6' },
  { key: '9', value: 'Class 7' },
  { key: '10', value: 'Class 8' },
];

const genderData = [
  { key: '1', value: 'Male' },
  { key: '2', value: 'Female' },
];

const StudentRegistrationScreen = ({ navigation, route }) => {
  const { student } = route.params || {};

  const [regNo, setRegNo] = useState(student?.regno || '');
  const [name, setName] = useState(student?.name || '');
  const [dob, setDob] = useState(student?.dob || '');
  const [fatherName, setFatherName] = useState(student?.fathername || '');
  const [caste, setCaste] = useState(student?.caste || '');
  const [gender, setGender] = useState(student?.gender || '');
  const [occupation, setOccupation] = useState(student?.occupation || '');
  const [residence, setResidence] = useState(student?.residence || '');
  const [stdEmail, setStdEmail] = useState(student?.email || '');
  const [password, setPassword] = useState('');
  const [admissionClass, setAdmissionClass] = useState('');
  const [remarks, setRemarks] = useState(student?.remarks || '');

  const getDDMMYYYYDate = () => {
    const date = new Date();
    const d = date.getDate();
    const dd = d < 10 ? '0' + d : d;
    const m = date.getMonth() + 1;
    const mm = m < 10 ? '0' + m : m;
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const getClasswiseSubjects = (assignedClass) => {
    let subjects = [];
    switch (assignedClass) {
      case 'Nursery':
        subjects = ['English', 'Urdu', 'Maths', 'Nazara-e-Quran'];
        break;
      case 'Prep':
        subjects = ['English', 'Urdu', 'Maths', 'Nazara-e-Quran', 'General Knowledge'];
        break;
      case 'Class 1':
        subjects = ['English', 'Urdu', 'Maths', 'General Knowledge', 'Islamyat'];
        break;
      case 'Class 2':
      case 'Class 3':
        subjects = ['English', 'Urdu', 'Maths', 'General Knowledge', 'Islamyat', 'Computer Part 1', 'Computer Part 2'];
        break;
      case 'Class 4':
      case 'Class 5':
        subjects = ['English', 'Urdu', 'Maths', 'General Knowledge', 'Islamyat', 'Computer Part 1', 'Computer Part 2', 'Social Study'];
        break;
      case 'Class 6':
      case 'Class 7':
      case 'Class 8':
        subjects = ['English', 'Urdu', 'Maths', 'General Knowledge', 'Islamyat', 'Computer Part 1', 'Computer Part 2', 'Social Study', 'Quran'];
        break;
    }
    return subjects;
  };

  const registerStudent = async () => {
    console.log('Registering student...');
    // show all fields
    console.log(regNo, name, dob, student.admissiondate, fatherName, gender, caste, occupation, residence, stdEmail, password, admissionClass, remarks);

    if (regNo.trim() === '' || regNo < 1 || regNo > 1000) {
      Alert.alert('Error', 'Please enter a valid registration number!');
      return;
    }

    const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(20\d{2})$/;
    if (!regex.test(dob)) {
      Alert.alert('Error', 'Please enter a valid date in DD/MM/YYYY format! Year should be between 2000 and 2999.');
      return;
    }

    if (student === undefined && password.trim() === '') {
      Alert.alert('Error', 'Please enter a password!');
      return;
    }

    if (name.trim() === '' || fatherName.trim() === '' || caste.trim() === '' || occupation.trim() === '' || residence.trim() === '' || stdEmail.trim() === '' || admissionClass.trim() === '') {
      Alert.alert('Error', 'Please fill all the fields!');
      return;
    }

    const email = `std${regNo}@school.com`;

    Alert.alert('Registering', 'Please wait while we register the student...');

    try {
      if (student === undefined) {
        await auth().createUserWithEmailAndPassword(email, password);
        console.log('New Student credentials created!');
      }

      await firestore().collection('Students').doc(regNo).set({
        RegNo: regNo,
        AdmissionDate: student ? student.admissiondate : getDDMMYYYYDate(),
        Name: name,
        DOB: dob,
        Gender: gender,
        FatherName: fatherName,
        Caste: caste,
        Occupation: occupation,
        Residence: residence,
        Email: stdEmail,
        Password: password,
        Remarks: remarks,
        AdmissionClass: firestore().collection('Classes').doc(admissionClass),
      });
      console.log('New Student Registration added!');

      const subjects = getClasswiseSubjects(admissionClass);
      const marksCollection = firestore().collection('Students').doc(regNo).collection('Marks');

      // Clear the marks collection if student is being updated
      if (student !== undefined) {
        await firestore().collection('Students').doc(regNo).collection('Marks').get().then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
      }

      for (const subject of subjects) {
        await marksCollection.doc(subject).set({});
      }

      console.log('Subjects added to Marks collection!');
      Alert.alert('Registered', 'Student registered successfully!');
      navigation.goBack();
    }
    catch (error) {
      console.error('Error adding student: ', error);
      let message = 'An error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email address is already in use.';
      } else if (error.code === 'auth/weak-password') {
        message = 'The password is weak. Try a stronger one.';
      }
      Alert.alert('Error', message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {student === undefined && <FormField label="Reg No (1-1000)" hook={setRegNo} keyboard={'numeric'} value={regNo} />}
      <FormField label="Name" hook={setName} value={name} />
      <FormField label="Date of Birth (DD/MM/YYYY)" hook={setDob} value={dob} />
      <Text style={styles.selectListLabel}>Gender</Text>
      <SelectList
        setSelected={setGender}
        data={genderData}
        save="value"
        boxStyles={styles.selectListBoxStyle}
        inputStyles={styles.selectListInputStyle}
        defaultOption={{ key: gender, value: gender }}
      />

      <FormField label="Father Name" hook={setFatherName} value={fatherName} />
      <FormField label="Caste" hook={setCaste} value={caste} />
      <FormField label="Occupation" hook={setOccupation} value={occupation} />
      <FormField label="Residence" hook={setResidence} value={residence} />

      <FormField label="Email" hook={setStdEmail} value={stdEmail} />

      {student === undefined && <FormField label="Password" hook={setPassword} />}
      <Text style={styles.selectListLabel}>Assigned Class</Text>
      <SelectList
        setSelected={setAdmissionClass}
        data={classData}
        save="value"
        boxStyles={styles.selectListBoxStyle}
        inputStyles={styles.selectListInputStyle}
        defaultOption={{ value: admissionClass }}
      />

      <FormField label="Remarks (if any)" hook={setRemarks} value={remarks} />

      <View style={styles.buttonContainer}>
        <Button title={
          student === undefined ? 'Register Student' : 'Update Student'
        } onPress={registerStudent} />
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
  selectListLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: colors.primary,
    marginBottom: 10,
  },
  selectListBoxStyle: {
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#E8F0FE',
    width: '100%',
    color: '#1E90FF',
  },
  selectListInputStyle: {
    color: '#1E90FF',
  }
});

export default StudentRegistrationScreen;
