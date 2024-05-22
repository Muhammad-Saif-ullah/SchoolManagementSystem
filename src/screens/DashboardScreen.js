// src/screens/DashboardScreen.js
import React from 'react';
import {View, Text, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

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

export default DashboardScreen;
