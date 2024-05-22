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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
