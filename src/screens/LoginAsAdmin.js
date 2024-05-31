import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormField from '../components/FormField';
import auth from '@react-native-firebase/auth';
import colors from '../styles/colors';

const LoginAsAdmin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User Login successful!');
        const temp = email;
        setEmail('');
        setPassword('');
        navigation.navigate('AdminPortalScreen', { email: temp });
      })
      .catch(error => {
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
            message =
              'The supplied credentials are incorrect, malformed or expired.';
            break;
        }
        Alert.alert('Error', message);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login Screen</Text>
      <FormField label="Enter email" hook={setEmail} value={email} />
      <FormField label="Enter password" hook={setPassword} value={password} secureTextEntry />
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
    padding: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginAsAdmin;
