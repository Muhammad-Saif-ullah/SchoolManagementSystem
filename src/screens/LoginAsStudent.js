import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import colors from '../styles/colors';

const LoginAsStudent = ({ navigation }) => {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (regNo.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both registration number and password.');
      return;
    }

    auth()
      .signInWithEmailAndPassword(`${regNo}@school.com`, password)
      .then(() => {
        console.log('Student Login successful!');
        navigation.navigate('StudentPortal', {regNo});
      })
      .catch(error => {
        let message = 'An error occurred. Please try again.';
        switch (error.code) {
          case 'auth/invalid-email':
            message = 'Please enter a valid registration number.';
            break;
          case 'auth/user-not-found':
            message = "This user account doesn't exist.";
            break;
          case 'auth/wrong-password':
            message = 'The password you entered is wrong.';
            break;
          case 'auth/user-disabled':
            message = 'This user account is disabled.';
            break;
        }
        Alert.alert('Error', message);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Reg No</Text>
      <TextInput
        style={styles.input}
        value={regNo}
        onChangeText={setRegNo}
        placeholder="Enter your registration number"
        placeholderTextColor={'#B0C4DE'}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor={'#B0C4DE'}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        // onPress={handleLogin}>       //change to this code, niche wala code to test
        onPress={() => navigation.navigate('StudentPortal', {regNo})} //wrong code 
        >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.newStudentContainer}>
        <Text style={styles.newStudentText}>New Student?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('StudentForm')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    color: colors.primary,
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#E8F0FE',
    color: '#1E90FF',
  },
  button: {
    backgroundColor: '#4169E1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  newStudentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newStudentText: {
    fontSize: 16,
    color: colors.primary,
  },
  signUpText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});

export default LoginAsStudent;