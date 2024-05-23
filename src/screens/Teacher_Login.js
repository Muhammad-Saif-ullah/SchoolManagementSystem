import React, {useState} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
import MyComponent from '../components/MyComponent';
import auth from '@react-native-firebase/auth';
import colors from '../styles/colors';

const LoginScreen = ({navigation}) => {
  // Hooks to manage the state of email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login logic
  const handleLogin = () => {
    // Firebase Authentication: Sign in with email and password
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Teacher Login successful!');
        
        // Store the email temporarily
        const temp = email;
        // Clear the input fields
        setEmail('');
        setPassword('');
        // Navigate to the TeacherPortal screen and pass the email as a parameter
        navigation.navigate('TeacherPortalScreen', {email: temp});
      })
      .catch(error => {
        // Handle Firebase authentication errors
        let message = 'An error occurred. Please try again.';
        switch (error.code) {
          case 'auth/invalid-email':
            message = 'Please enter a valid email address.';
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
          case 'auth/invalid-credential':
            message = 'The supplied credentials are incorrect, malformed or expired.';
            break;
        }
        Alert.alert('Error', message);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <MyComponent label="Enter email" hook={setEmail} value={email} />
      <MyComponent label="Enter password" hook={setPassword} value={password} />
      <Button
        title="Log In"
        onPress={handleLogin}
        disabled={email.trim() === '' || password.trim() === ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.primary,
  },
});

export default LoginScreen;
