import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TeacherPortalScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Portal</Text>
      <Text style={styles.welcomeText}>Welcome Mr Saifullah!</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Classes Schedule</Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Manage Marks</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TeacherPortalScreen;
