import React from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableHighlight } from 'react-native';
import firestore from '@react-native-firebase/firestore';

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
            navigation.pop(1);
            Alert.alert('Logout', 'You have been logged out successfully');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handlePress = screen => {
    navigation.navigate(screen);
  };

  const showInfo = () => {
    Alert.alert(
      'Info',
      'Long press on button to proceed',
    );
  }

  const initDB = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to initialize the database? This option should be used only the first time you are setting up the app.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Alert.alert('Initializing...');

            try {
              // Creating classes
              firestore().collection('Classes').doc('Class 2-3').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Islamyat',
                  'Computer Part 1',
                  'Computer Part 2',
                ],
              });
              firestore().collection('Classes').doc('Class 4-5').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Social Study',
                  'Islamyat',
                  'Computer Part 1',
                  'Computer Part 2',
                ],
              });
              firestore().collection('Classes').doc('Class 6,7,8').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Social Study',
                  'Islamyat',
                  'Computer Part 1',
                  'Computer Part 2',
                  'Quran',
                ],
              });

              firestore().collection('Classes').doc('Class 1').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Islamyat',
                ],
              });
              firestore().collection('Classes').doc('Class 2').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Islamyat',
                  'Computer Part 1',
                  'Computer Part 2',
                ],
              });
              firestore().collection('Classes').doc('Class 3').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Islamyat',
                  'Computer Part 1',
                  'Computer Part 2',
                ],
              });
              firestore().collection('Classes').doc('Class 4').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Social Study',
                  'Islamyat',
                  'Computer Part 1',
                  'Computer Part 2',
                ],
              });
              firestore().collection('Classes').doc('Class 5').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Social Study',
                  'Islamyat',
                  'Computer Part 1',
                  'Computer Part 2',
                ],
              });
              firestore().collection('Classes').doc('Class 6').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Social Study',
                  'Islamyat',
                  'Computer Part 1',
                  'Computer Part 2',
                  'Quran',
                ],
              });
              firestore().collection('Classes').doc('Class 7').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Social Study',
                  'Islamyat',
                  'Computer Part 1',
                  'Computer Part 2',
                  'Quran',
                ],
              });
              firestore().collection('Classes').doc('Class 8').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'General Knowledge',
                  'Social Study',
                  'Islamyat',
                  'Computer Part 1',
                  'Computer Part 2',
                  'Quran',
                ],
              });
              firestore().collection('Classes').doc('Nursery').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'Nazra-e-Quran',
                ],
              });
              firestore().collection('Classes').doc('Prep').set({
                Subjects: [
                  'English',
                  'Urdu',
                  'Math',
                  'Nazra-e-Quran',
                  'General Knowledge',
                ],
              });

              // Creating Subjects
              firestore().collection('Subjects').doc('English').set({
                marksDistribution: [50, 50, 100],
              });
              firestore().collection('Subjects').doc('Urdu').set({
                marksDistribution: [50, 50, 100],
              });
              firestore().collection('Subjects').doc('Math').set({
                marksDistribution: [50, 50, 100],
              });
              firestore().collection('Subjects').doc('General Knowledge').set({
                marksDistribution: [50, 50, 100],
              });
              firestore().collection('Subjects').doc('Islamyat').set({
                marksDistribution: [50, 50, 100],
              });
              firestore().collection('Subjects').doc('Social Study').set({
                marksDistribution: [50, 50, 100],
              });
              firestore().collection('Subjects').doc('Computer Part 1').set({
                marksDistribution: [35, 35, 70],
              });
              firestore().collection('Subjects').doc('Computer Part 2').set({
                marksDistribution: [15, 15, 30],
              });
              firestore().collection('Subjects').doc('Quran').set({
                marksDistribution: [50, 50, 100],
              });
              firestore().collection('Subjects').doc('Nazra-e-Quran').set({
                marksDistribution: [50, 50, 100],
              });

              // Creating empty collections for Students and Teachers
              firestore().collection('Students');
              firestore().collection('Teachers');
            }
            catch (error) {
              console.error('Error initializing database: ', error);
              Alert.alert('Error initializing database: ', error);
            }
            finally {
              Alert.alert('Database initialized successfully');
            }
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.subtitle}>
        <Text>Welcome, {email}</Text>
      </View>
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
          title="Manage Students"
          onPress={() => handlePress('ManageStudentsScreen')}
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

      <View style={styles.redButtonWrapper}>
        <TouchableHighlight title="Initialize Database" onPress={showInfo} onLongPress={initDB} >
          <View style={styles.button}>
            <Text style={{ color: 'white', padding: 10, textAlign: 'center' }}>
              INITIALIZE DATABASE
            </Text>
          </View>
        </TouchableHighlight>
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
  redButtonWrapper: {
    marginTop: 100,
    marginBottom: 10,
    width: '80%',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  button: {
    borderRadius: 15,
  },
  subtitle: {
    marginBottom: 20,
  },
});

export default AdminPortalScreen;
