import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

var email = '';

const AdminPortalScreen = ({ route, navigation }) => {
  email = route.params.email;

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            auth()
              .signOut()
              .then(() => {
                console.log('User Signed Out!');
                navigation.popToTop();
              })
              .catch(error => {
                console.error(error);
                Alert.alert('Error', 'An error occurred. Check console.');
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handlePress = screen => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button
          title="Assign Classes"
          onPress={() => handlePress('AssignClassesScreen')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Register Student"
          onPress={() => handlePress('StudentRegistrationScreen')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Fee Status"
          onPress={() => handlePress('FeeStatusScreen')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="View Reports"
          onPress={() => handlePress('ViewReportsScreen')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Syllabus"
          onPress={() => handlePress('SyllabusScreen')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Timetables"
          onPress={() => handlePress('TimetablesScreen')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginBottom: 10,
    width: '80%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 15,
  },
});

export default AdminPortalScreen;
