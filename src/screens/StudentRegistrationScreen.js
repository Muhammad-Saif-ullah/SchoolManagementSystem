import React from 'react';
import {View, Button, StyleSheet, ScrollView} from 'react-native';
import colors from '../styles/colors';
import FormField from '../components/FormField';

const StudentRegistrationScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormField label="Reg No" />
      <FormField label="Name" />
      <FormField label="Date of Birth" placeholder={'DD/MM/YYYY'} />
      <FormField label="Father Name" />
      <FormField label="Admission Date" />
      <FormField label="Gender" />
      <FormField label="Occupation" />
      <FormField label="Class" />
      <FormField label="Residence" />
      <FormField label="Email" />
      <FormField label="Password" />
      <FormField label="Remarks" />
      <View style={styles.buttonContainer}>
        <Button title="Register" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.secondary,
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '50%',
  },
});

export default StudentRegistrationScreen;
