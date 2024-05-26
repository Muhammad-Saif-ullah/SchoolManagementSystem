import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const TimetablesScreen = ({ navigation }) => {
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const snapshot = await firestore().collection('timetable').orderBy('className').get();
        const timetableData = snapshot.docs.map(doc => ({
          id: doc.id,
          className: doc.data().className,
          image: doc.data().image,
        }));
        setTimetables(timetableData);
      } catch (error) {
        console.error('Error fetching timetables:', error);
        Alert.alert('Error', 'Error fetching timetables!');
      }
    };

    fetchTimetables();
  }, []);

  const handleEdit = (className, image) => {
    navigation.navigate('UploadTimetableScreen', { edit: true, className, uri: image });
  };

  const handleDelete = async (className) => {
    try {
      const querySnapshot = await firestore().collection('timetables').where('className', '==', className).get();
      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0];
        await firestore().collection('timetables').doc(document.id).delete();
        setTimetables(timetables.filter(item => item.className !== className));
        Alert.alert('Success', 'Timetable deleted successfully!');
      } else {
        Alert.alert('Error', 'Document not found!');
      }
    } catch (error) {
      console.error('Error deleting timetable:', error);
      Alert.alert('Error', 'Error deleting timetable!');
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate("UploadTimetableScreen", { edit: false })}>
        <Text style={{ color: "white" }}>Upload Timetable</Text>
      </TouchableOpacity>

      {timetables.map(item => (
        <View key={item.id} style={styles.timetableItem}>
          <Text>{item.className}</Text>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.className, item.image)}>
            <Text style={{ color: "white" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.className)}>
            <Text style={{ color: "white" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  editButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  timetableItem: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default TimetablesScreen;
