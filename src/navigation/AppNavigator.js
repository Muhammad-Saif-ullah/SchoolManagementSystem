import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import AdminPortalScreen from '../screens/AdminPortalScreen';
import AssignClassesScreen from '../screens/AssignClassesScreen';
import StudentRegistrationScreen from '../screens/StudentRegistrationScreen';
import FeeStatusScreen from '../screens/FeeStatusScreen';
import ViewFeeStatusScreen from '../screens/ViewFeeStatusScreen';
import AddNewFeeStatusScreen from '../screens/AddNewFeeStatusScreen';
import ViewReportScreen from '../screens/ViewReportsScreen';
import ViewStudentAgeRecordScreen from '../screens/ViewStudentAgeRecordScreen';
import ResultSheetScreen from '../screens/ResultSheetScreen';
import SyllabusScreen from '../screens/SyllabusScreen';
import TimetablesScreen from '../screens/TimetablesScreen';

import Header from '../components/Header';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginAsAdmin from '../screens/LoginAsAdmin'; // You need to create this screen
import LoginAsTeacher from '../screens/LoginAsTeacher'; // You need to create this screen
import LoginAsStudent from '../screens/LoginAsStudent';
import StudentPortal from '../screens/StudentPortal';
import Teacher_Login from '../screens/Teacher_Login';
import StudentRegistrationForm from '../screens/StudentRegistrationForm.js';
import Teacher_Portal_Screen from '../screens/Teacher_Portal_Screen.js';
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
        <Stack.Screen name="AdminPortalScreen" component={AdminPortalScreen} />
        <Stack.Screen
          name="AssignClassesScreen"
          component={AssignClassesScreen}
        />
        <Stack.Screen
          name="StudentRegistrationScreen"
          component={StudentRegistrationScreen}
        />
        <Stack.Screen name="FeeStatusScreen" component={FeeStatusScreen} />
        <Stack.Screen
          name="ViewFeeStatusScreen"
          component={ViewFeeStatusScreen}
        />
        <Stack.Screen
          name="AddNewFeeStatusScreen"
          component={AddNewFeeStatusScreen}
        />
        <Stack.Screen name="ViewReportsScreen" component={ViewReportScreen} />
        <Stack.Screen
          name="ViewStudentAgeRecordScreen"
          component={ViewStudentAgeRecordScreen}
        />
        <Stack.Screen name="ResultSheetScreen" component={ResultSheetScreen} />
        <Stack.Screen name="SyllabusScreen" component={SyllabusScreen} />
        <Stack.Screen name="TimetablesScreen" component={TimetablesScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="LoginAsAdmin" component={LoginAsAdmin} />
        <Stack.Screen name="LoginAsTeacher" component={Teacher_Login} />
        <Stack.Screen name="TeacherPortalScreen" component={Teacher_Portal_Screen} />
        <Stack.Screen name="LoginAsStudent" component={LoginAsStudent} />
        <Stack.Screen name="StudentPortal" component={StudentPortal} />
        <Stack.Screen name="StudentRegistrationForm" component={StudentRegistrationForm} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
