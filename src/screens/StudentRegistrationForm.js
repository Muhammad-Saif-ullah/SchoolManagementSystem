//dummy screen

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import colors from '../styles/colors';

const StudentRegistrationForm = ({ navigation }) => {

  const [regNo, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Student registered successfully!');
    navigation.navigate('LoginAsStudent');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Reg No</Text>
      <TextInput
        style={styles.input}
        value={regNo}
        onChangeText={setRegNo}
        placeholder="Enter your registration number"
        placeholderTextColor="#666"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#666"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#666"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#666"
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
    borderColor: '#9AC4CD',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#E8F0FE',
    color: '#333',
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
});

export default StudentRegistrationForm;
