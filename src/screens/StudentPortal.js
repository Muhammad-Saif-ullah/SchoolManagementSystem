//working on it
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import colors from '../styles/colors';

const StudentPortal = ({ navigation, route }) => {
  const { name, regNo } = route.params;

  const handleButtonPress = (buttonName) => {
    // Perform functionality based on the button name
    console.log(`Button "${buttonName}" pressed.`);
    // For example, navigation to DummyScreen.js
    navigation.navigate('DummyScreen');
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User Signed Out!');
        navigation.popToTop();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {name}!</Text>
      <Text style={styles.regNoText}>Your Registration Number: {regNo}</Text>
      <View style={styles.buttonContainer}>
        <CustomButton title="View Marks" onPress={() => handleButtonPress("View Marks")} />
        <CustomButton title="View Previous Records" onPress={() => handleButtonPress("View Previous Records")} />
        <CustomButton title="View Fee Status" onPress={() => handleButtonPress("View Fee Status")} />
        <CustomButton title="View Timetable" onPress={() => handleButtonPress("View Timetable")} />
        <CustomButton title="View Syllabus" onPress={() => handleButtonPress("View Syllabus")} />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 10,
  },
  regNoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StudentPortal;



