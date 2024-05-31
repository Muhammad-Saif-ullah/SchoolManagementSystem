import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../styles/colors';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/School-Management-System.jpg')}
        style={styles.image} />
      <Text style={styles.title}>Welcome to School Management System</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginAsAdmin')}>
        <Text style={styles.buttonText}>Login as Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginAsTeacher')}>
        <Text style={styles.buttonText}>Login as Teacher</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginAsStudent')}>
        <Text style={styles.buttonText}>Login as Student</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4D4FF',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  image: {
    width: "100%",
    height: 310,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default WelcomeScreen;