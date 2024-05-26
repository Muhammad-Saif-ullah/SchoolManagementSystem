import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const LoginAsAdmin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Login as Admin Screen</Text>
      <Button title='Go to Admin Portal' onPress={
        () => navigation.navigate('AdminPortalScreen')
      }></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginAsAdmin;
