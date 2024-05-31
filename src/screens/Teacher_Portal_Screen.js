import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const TeacherPortalScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [teacherData, setTeacherData] = useState(null);
  const [assignedClassData, setAssignedClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        console.log(`Fetching data for email: "${email}"`);

        const normalizedEmail = email.trim().toLowerCase();
        console.log(`Normalized Email: "${normalizedEmail}"`);

        const teacherDoc = await firestore().collection('Teachers').doc(normalizedEmail).get();

        if (teacherDoc.exists) {
          const data = teacherDoc.data();
          console.log("Teacher Document Data: ", data); // Log the data
          setTeacherData(data);

          if (data.AssignedClass) {
            const assignedClassRef = data.AssignedClass; // Get the reference
            const assignedClassDocSnapshot = await assignedClassRef.get(); // Retrieve the document
            console.log('Resolved Assigned Classes for Teacher:', assignedClassDocSnapshot.id);

            if (assignedClassDocSnapshot.exists) {
              const assignedClassData = assignedClassDocSnapshot.data(); // Extract the data
              setAssignedClassData(assignedClassData);
            } else {
              console.log("Assigned class document does not exist.");
            }
          }
          else {
            console.log("AssignedClass field is missing.");
          }
        } else {
          console.log("Teacher document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching teacher data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [email]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Portal</Text>
      {teacherData ? (
        <>
          <Text style={styles.welcomeText}>Welcome, {teacherData.Name}!</Text>
          {/* {assignedClassData ? (
            <Text style={styles.welcomeText}>Assigned Class: {assignedClassData.ClassName}</Text>
          ) : (
            <Text style={styles.errorText}>Failed to load assigned class data.</Text>
          )} */}
        </>
      ) : (
        <Text style={styles.errorText}>Failed to load teacher data.</Text>
      )}
      <View style={styles.button}>
        <Button
          title="Manage Marks"
          onPress={() => navigation.navigate('ManageMarksScreen')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default TeacherPortalScreen;