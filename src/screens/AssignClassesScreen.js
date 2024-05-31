import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SelectList } from 'react-native-dropdown-select-list';
import colors from '../styles/colors';

const AssignClassesScreen = ({ navigation }) => {
  const [teachers, setTeachers] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);

  const allClasses = [
    { key: 'Nursery', value: 'Nursery' },
    { key: 'Prep', value: 'Prep' },
    { key: 'Class 1', value: 'Class 1' },
    { key: 'Class 2', value: 'Class 2' },
    { key: 'Class 3', value: 'Class 3' },
    { key: 'Class 4', value: 'Class 4' },
    { key: 'Class 5', value: 'Class 5' },
    { key: 'Class 6', value: 'Class 6' },
    { key: 'Class 7', value: 'Class 7' },
    { key: 'Class 8', value: 'Class 8' },
  ];

  useEffect(() => {
    const fetchTeachersData = async () => {
      try {
        const snapshot = await firestore().collection('Teachers').get();
        const teachersData = await Promise.all(
          snapshot.docs.map(async doc => {
            const assignedClassRef = doc.data().AssignedClass;
            let assignedClassName = 'Not assigned';

            if (assignedClassRef) {
              const classDoc = await assignedClassRef.get();
              assignedClassName = classDoc.exists ? classDoc.id : 'Unknown class';
            }

            return {
              id: doc.id,
              name: doc.data().Name,
              assignedClass: assignedClassName,
            };
          })
        );
        setTeachers(teachersData);
        updateAvailableClasses(teachersData);
      }
      catch (error) {
        console.error('Error fetching teachers data:', error);
        Alert.alert('Error', 'An error occurred. Check console.');
      }
      finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchTeachersData();
  }, []);

  const updateAvailableClasses = (teachersData) => {
    const assignedClasses = teachersData
      .map(teacher => teacher.assignedClass)
      .filter(assignedClass => assignedClass !== 'Not assigned');
    const newAvailableClasses = allClasses.filter(
      availableClass => !assignedClasses.includes(availableClass.value)
    );
    setAvailableClasses(newAvailableClasses);
  };

  const assignClass = async (teacherId, className) => {
    try {
      const classDocRef = firestore().collection('Classes').doc(className);
      const teacherRef = firestore().collection('Teachers').doc(teacherId);
      await teacherRef.update({
        AssignedClass: classDocRef,
      });
      Alert.alert('Success', 'Class assigned successfully.');

      const updatedTeachers = teachers.map(teacher =>
        teacher.id === teacherId ? { ...teacher, assignedClass: className } : teacher
      );
      setTeachers(updatedTeachers);
      updateAvailableClasses(updatedTeachers);
    } catch (error) {
      console.error('Error assigning class:', error);
      Alert.alert('Error', 'Failed to assign class.');
    }
  };

  const unassignClass = async (teacherId) => {
    try {
      const teacherRef = firestore().collection('Teachers').doc(teacherId);
      await teacherRef.update({
        AssignedClass: firestore.FieldValue.delete(),
      });
      Alert.alert('Success', 'Class unassigned successfully.');

      const updatedTeachers = teachers.map(teacher =>
        teacher.id === teacherId ? { ...teacher, assignedClass: 'Not assigned' } : teacher
      );
      setTeachers(updatedTeachers);
      updateAvailableClasses(updatedTeachers);
    } catch (error) {
      console.error('Error unassigning class:', error);
      Alert.alert('Error', 'Failed to unassign class.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Classes</Text>
      {loading && <ActivityIndicator size="large" color={colors.primary} />}
      <ScrollView>
        {teachers.map((teacher, index) => (
          <View key={index} style={styles.teacherContainer}>
            <Text style={styles.boldText}>{teacher.name}</Text>
            <Text>Assigned Class:</Text>
            <View style={styles.classContainer}>
              <Text>{teacher.assignedClass}</Text>
              {teacher.assignedClass !== 'Not assigned' && (
                <Button
                  title="Unassign"
                  onPress={() => unassignClass(teacher.id)}
                />
              )}
            </View>
            {teacher.assignedClass === 'Not assigned' && (
              <>
                <SelectList
                  setSelected={setSelectedClass}
                  data={availableClasses}
                  save="value"
                  boxStyles={styles.selectListBoxStyle}
                  inputStyles={styles.selectListInputStyle}
                  placeholder="Select class"
                />
                <Button
                  title="Assign"
                  onPress={() => {
                    if (selectedClass) {
                      assignClass(teacher.id, selectedClass);
                    } else {
                      Alert.alert('Error', 'Please select a class to assign.');
                    }
                  }}
                />
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  teacherContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  classContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  selectListBoxStyle: {
    marginVertical: 10,
    width: '100%',
  },
  selectListInputStyle: {
    padding: 10,
  },
});

export default AssignClassesScreen;