import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ManageMarksScreen = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      setLoading(true);
      try {
        const user = auth().currentUser;
        if (user) {
          console.log('Current User:', user.email);
          const teacherDoc = await firestore().collection('Teachers').doc(user.email).get();
          if (teacherDoc.exists) {
            const teacher = teacherDoc.data();
            setTeacherData(teacher);
            console.log('Teacher Data:', teacher);

            // Resolve AssignedClasses references for teacher
            const assignedClassesRef = teacher.AssignedClass;
            const assignedClasses = await 
              assignedClassesRef.get().then(doc => doc.id)
            
            console.log('Resolved Assigned Classes for Teacher:', assignedClasses);

            if (assignedClasses.length > 0) {
              const studentsQuerySnapshot = await firestore()
                .collection('Students')
                .get();

              console.log('Students Query Snapshot Size:', studentsQuerySnapshot.size);
              console.log('Students Query Snapshot:', studentsQuerySnapshot.docs);

              const studentsData = await Promise.all(
                studentsQuerySnapshot.docs.map(async studentDoc => {
                  const student = studentDoc.data();

                  // Resolve AdmissionClass reference for each student
                  const studentAdmissionClassRef = student.AdmissionClass;
                  const studentAdmissionClass = await studentAdmissionClassRef.get().then(doc => doc.id);
                  console.log('Resolved Admission Class for Student:', studentAdmissionClass);

                  // Check if student's admission class matches any of the teacher's assigned classes
                  if (assignedClasses.includes(studentAdmissionClass)) {
                    console.log('Teacher class and student class matched!');
                    const marksCollection = await firestore()
                      .collection('Students')
                      .doc(studentDoc.id)
                      .collection('Marks')
                      .get();

                    const subjectsData = await Promise.all(
                      marksCollection.docs.map(async subjectDoc => {
                        const subjectData = await firestore()
                          .collection('Students')
                          .doc(studentDoc.id)
                          .collection('Marks')
                          .doc(subjectDoc.id)
                          .get();

                        return { subjectName: subjectDoc.id, ...subjectData.data() };
                      })
                    );

                    return { id: studentDoc.id, ...student, marks: subjectsData };
                  } else {
                    return null; // Return null if student's admission class doesn't match any of the teacher's assigned classes
                  }
                })
              );

              // Filter out null entries (students whose admission class doesn't match any of the teacher's assigned classes)
              const filteredStudentsData = studentsData.filter(student => student !== null);

              setStudents(filteredStudentsData);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching teacher or student data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  const updateMark = async (studentId, subjectName, markType, newValue) => {
    try {
      // Update mark in Firebase
      await firestore()
        .collection('Students')
        .doc(studentId)
        .collection('Marks')
        .doc(subjectName)
        .update({
          [markType]: newValue
        });
      
      // Update local state to reflect the change
      setStudents(prevStudents => {
        return prevStudents.map(student => {
          if (student.id === studentId) {
            return {
              ...student,
              marks: student.marks.map(mark => {
                if (mark.subjectName === subjectName) {
                  return {
                    ...mark,
                    [markType]: newValue
                  };
                }
                return mark;
              })
            };
          }
          return student;
        });
      });
  
      console.log(`Successfully updated ${markType} for ${subjectName}`);
    } catch (error) {
      console.error("Error updating mark: ", error);
    }
  };
  

  const removeMark = async (studentId, subjectName, markType) => {
    try {
      // Update local state to clear the corresponding field
      setStudents(prevStudents => {
        const updatedStudents = prevStudents.map(student => {
          if (student.id === studentId) {
            // Create a copy of the student object to avoid mutating state directly
            const updatedStudent = { ...student };
            // Clear the mark in the local state
            updatedStudent.marks = updatedStudent.marks.map(mark => {
              if (mark.subjectName === subjectName) {
                // Clear the mark type (FirstTerm, MidTerm, or FinalTerm)
                mark[markType] = '';
              }
              return mark;
            });
            return updatedStudent;
          }
          return student;
        });
        return updatedStudents;
      });
  
      // Remove the mark from Firebase
      await firestore()
        .collection('Students')
        .doc(studentId)
        .collection('Marks')
        .doc(subjectName)
        .update({
          [markType]: firestore.FieldValue.delete()
        });
      console.log(`Successfully removed ${markType} for ${subjectName}`);
    } catch (error) {
      console.error("Error removing mark: ", error);
    }
  };

  const getTotalMarks = (subjectName, markType) => {
    if (markType === 'FirstTerm' || markType === 'MidTerm') {
      switch (subjectName) {
        case 'English':
        case 'Urdu':
        case 'Maths':
        case 'Nazra-e-Quran':
        case 'General Knowledge':
        case 'Islamyat':
        case 'Social Study':
          return '/50';
        case 'Computer Part 1':
          return '/35';
        case 'Computer Part 2':
          return '/15';
        default:
          return '';
      }
    } else if (markType === 'FinalTerm') {
      switch (subjectName) {
        case 'English':
        case 'Urdu':
        case 'Maths':
        case 'Nazra-e-Quran':
        case 'General Knowledge':
        case 'Islamyat':
        case 'Social Study':
          return '/100';
        case 'Computer Part 1':
          return '/70';
        case 'Computer Part 2':
          return '/30';
        default:
          return '';
      }
    } else {
      return '';
    }
  };

  const renderStudent = ({ item }) => (
    <View style={styles.studentContainer}>
      <Text style={styles.studentName}>Student Name: {item.Name}</Text>
      {item.marks.map(mark => (
        <View key={mark.subjectName} style={styles.subjectContainer}>
          <Text style={styles.subjectName}>{mark.subjectName}</Text>
          <View style={styles.markContainer}>
            <TextInput
              style={styles.input}
              value={mark.FirstTerm}
              placeholder={`First Term ${getTotalMarks(mark.subjectName, 'FirstTerm')}`}
              onChangeText={text => updateMark(item.id, mark.subjectName, 'FirstTerm', text)}
            />
            {/* <Button
              title="Remove 1st Term Marks"
              onPress={() => removeMark(item.id, mark.subjectName, 'FirstTerm')}
            /> */}
            <TextInput
              style={styles.input}
              value={mark.MidTerm}
              placeholder={`Mid Term ${getTotalMarks(mark.subjectName, 'MidTerm')}`}
              onChangeText
              ={text => updateMark(item.id, mark.subjectName, 'MidTerm', text)}
            />
            {/* <Button
              title="Remove Midterm Marks"
              onPress={() => removeMark(item.id, mark.subjectName, 'MidTerm')}
            /> */}
            <TextInput
              style={styles.input}
              value={mark.FinalTerm}
              placeholder={`Final Term ${getTotalMarks(mark.subjectName, 'FinalTerm')}`}
              onChangeText={text => updateMark(item.id, mark.subjectName, 'FinalTerm', text)}
            />
            {/* <Button
              title="Remove Final Term Marks"
              onPress={() => removeMark(item.id, mark.subjectName, 'FinalTerm')}
            /> */}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderStudent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  studentContainer: {
    marginBottom: 16,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subjectContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  markContainer: {
    flexDirection: 'column', // Ensure vertical layout
    alignItems: 'flex-start', // Align items to the start of the container
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8, // Add space between input fields
    width: 150, // Set width to ensure consistent layout
  },
});

export default ManageMarksScreen;
