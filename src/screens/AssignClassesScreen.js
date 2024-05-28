import { Alert, Button, TextInput, Text, View, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

const AssignClassesScreen = ({ navigation }) => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachersData = async () => {
            try {
                const snapshot = await firestore().collection('teachers').get();

                const teachers = snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                    assignedClass: doc.data().assignedClass,
                }));

                setTeachers(teachers);
            }
            catch (error) {
                console.error('Error fetching teachers data:', error);
                Alert.alert('Error', 'An error occurred. Check console.');
            }
        }

        fetchTeachersData();
    }, []);

    const handleSave = () => {
        teachers.forEach(teacher => {
            firestore().collection('teachers').doc(teacher.id).update({
                assignedClass: teacher.assignedClass,
            })
                .then(() => {
                    console.log('Teacher data updated successfully!');
                    Alert.alert('Success', 'Teacher data updated successfully!');
                    navigation.goBack();
                }
                )
                .catch(error => {
                    console.error('Error updating teacher data:', error);
                    Alert.alert('Error', 'An error occurred. Check console.');
                });

        });
    };

    return (
        <View style={styles.container}>
            <Text>Assign Classes</Text>
            <ScrollView>
                <Button title="SAVE" onPress={handleSave}></Button>
                {
                    teachers.map((teacher, index) => (
                        <View key={index} style={styles.teacherContainer}>
                            <Text style={styles.boldText}>Teacher Name:</Text>
                            <Text>{teacher.name}</Text>
                            <Text style={styles.boldText}>Assigned Class:</Text>
                            <TextInput>{teacher.assignedClass}</TextInput>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
    teacherContainer: {
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default AssignClassesScreen;
