import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import MyComponent from '../components/MyComponent';
import colors from '../styles/colors';

const TeacherPortalScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Portal</Text>
      <Text style={styles.welcomeText}>Welcome Mr Saifullah!</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button
            title="Classes Schedule"
            onPress={() => navigation.navigate('ClassesScheduleScreen')}
          />
        </View>
        <View style={styles.button}>
        <Button
            title="Manage Marks"
            onPress={() => navigation.navigate('ManageMarksScreen')}
          />
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
