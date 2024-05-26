import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SyllabusScreen = ({ navigation }) => {
  const [syllabus, setSyllabus] = useState([]);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const snapshot = await firestore().collection('syllabus').orderBy('className').get();
        const syllabusData = snapshot.docs.map(doc => ({
          id: doc.id,
          className: doc.data().className,
          image: doc.data().image,
        }));
        setSyllabus(syllabusData);
      } catch (error) {
        console.error('Error fetching syllabus:', error);
        Alert.alert('Error', 'Error fetching syllabus!');
      }
    };

    fetchSyllabus();
  }, []);

  const handleEdit = (className, image) => {
    navigation.navigate('UploadSyllabusScreen', { edit: true, className, uri: image });
  };

  const handleDelete = async (className) => {
    try {
      const querySnapshot = await firestore().collection('syllabus').where('className', '==', className).get();
      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0];
        await firestore().collection('syllabus').doc(document.id).delete();
        setSyllabus(syllabus.filter(item => item.className !== className));
        Alert.alert('Success', 'Syllabus deleted successfully!');
      } else {
        Alert.alert('Error', 'Document not found!');
      }
    } catch (error) {
      console.error('Error deleting syllabus:', error);
      Alert.alert('Error', 'Error deleting syllabus!');
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate("UploadSyllabusScreen", { edit: false })}>
        <Text style={{ color: "white" }}>Upload Syllabus</Text>
      </TouchableOpacity>

      {syllabus.map(item => (
        <View key={item.id} style={styles.syllabusItem}>
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
  syllabusItem: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain', // Maintain aspect ratio
    marginVertical: 10, // Add vertical margin
    borderRadius: 10, // Optional: add border radius for rounded corners
  },
});

export default SyllabusScreen;
