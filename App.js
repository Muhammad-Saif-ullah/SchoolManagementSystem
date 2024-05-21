import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// A reusable component for input fields @uzair1103
const MyComponent = ({label, hook, value}) => {
  return (
    <>
      <Text>{label}</Text>
      <TextInput
        style={{borderColor: 'black', borderWidth: 1, width: 200}}
        onChangeText={hook}
        value={value}
      />
    </>
  );
};

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
        navigation.navigate('Dashboard', {email: temp});
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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>
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

const DashboardScreen = ({route, navigation}) => {
  return (
    <View>
      <Text>Welcome! Your email is {route.params.email}</Text>
      <Button
        title="Sign Out"
        onPress={() => {
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
        }}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
