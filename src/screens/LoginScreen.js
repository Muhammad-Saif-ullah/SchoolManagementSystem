import React, {useState} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
import MyComponent from '../components/MyComponent';
import auth from '@react-native-firebase/auth';
import colors from '../styles/colors';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('saif@gmail.com');
  const [password, setPassword] = useState('123test');

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User Login successful!');
        const temp = email;
        setEmail('');
        setPassword('');
        navigation.navigate('AdminPortalScreen', {email: temp});
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
