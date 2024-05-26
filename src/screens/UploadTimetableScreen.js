import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import colors from '../styles/colors';
import FormField from '../components/FormField';
import firestore from '@react-native-firebase/firestore';

const UploadTimetableScreen = ({ navigation, route }) => {
  const [className, setClassName] = useState(route.params?.className || '');
  const [uri, setUri] = useState(route.params?.uri || '');
  const [docId, setDocId] = useState('');

  useEffect(() => {
    if (route.params?.edit) {
      const fetchTimetable = async () => {
        try {
          const querySnapshot = await firestore()
            .collection('timetable')
            .where('className', '==', route.params.className)
            .get();

          if (!querySnapshot.empty) {
            const document = querySnapshot.docs[0];
            const data = document.data();
            setClassName(data.className);
            setUri(data.image);
            setDocId(document.id);
          } else {
            Alert.alert('Error', 'Document not found!');
          }
        } catch (error) {
          console.error('Error fetching timetable: ', error);
          Alert.alert('Error', 'Error fetching timetable!');
        }
      };

      fetchTimetable();
    }
  }, [route.params]);

  const handleSave = async () => {
    if (className.trim() === '' || uri.trim() === '') {
      Alert.alert('Error', 'Please fill all the fields!');
      return;
    }

    try {
      if (route.params?.edit) {
        await firestore()
          .collection('timetable')
          .doc(docId)
          .update({
            className,
            image: uri,
          });
        Alert.alert('Success', 'Timetable updated successfully!');
      } else {
        await firestore()
          .collection('timetable')
          .add({
            className,
            image: uri,
          });
        Alert.alert('Success', 'Timetable added successfully!');
      }
      navigation.pop(2);
    } catch (error) {
      console.error('Error in uploading timetable: ', error);
      Alert.alert('Error', 'Error uploading timetable!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>{route.params?.edit ? 'Edit Timetable' : 'Add Timetable'}</Text>
      <FormField label="Class Name" hook={setClassName} value={className} />
      <FormField label="Image URL" hook={setUri} value={uri} />

      <View style={styles.buttonContainer}>
        <Button title={route.params?.edit ? 'Edit' : 'Add'} onPress={handleSave} />
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

export default UploadTimetableScreen;
