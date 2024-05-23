import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import Header from '../components/Header';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginAsAdmin from '../screens/LoginAsAdmin'; // You need to create this screen
import LoginAsTeacher from '../screens/LoginAsTeacher'; // You need to create this screen
import LoginAsStudent from '../screens/LoginAsStudent';
import StudentPortal from '../screens/StudentPortal';
import StudentRegistrationForm from '../screens/StudentRegistrationForm.js';
// import another from '../screens/another';



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({navigation, route, options, back}) => (
            <Header title={route.name} />
          ),
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="LoginAsAdmin" component={LoginAsAdmin} />
        <Stack.Screen name="LoginAsTeacher" component={LoginAsTeacher} />
        <Stack.Screen name="LoginAsStudent" component={LoginAsStudent} />
        <Stack.Screen name="StudentPortal" component={StudentPortal}/>
        <Stack.Screen name="StudentRegistrationForm" component={StudentRegistrationForm}/>
        {/* <Stack.Screen name="another" component={another}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
