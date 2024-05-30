import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { DataTable } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import colors from '../styles/colors';

const ViewStudentAgeRecordScreen = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snapshot = await firestore().collection('Students').get();
        const studentsData = snapshot.docs.map(doc => doc.data());

        const studentsWithAge = studentsData.map(student => {
          const dobParts = student.DOB.split('/');
          const dob = new Date(dobParts[2], dobParts[1] - 1, dobParts[0]);
          const ageDate = new Date(Date.now() - dob.getTime());
          const age = {
            years: ageDate.getUTCFullYear() - 1970,
            months: ageDate.getUTCMonth(),
          };
          if (age.months === 0) {
            return {
              ...student,
              age: `${age.years} years`,
            };
          }
          return {
            ...student,
            age: `${age.years} years ${age.months} months`,
          };
        });

        setStudents(studentsWithAge);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch student data: ' + error.message);
      }
      finally {
        setLoading(false);
      }
    };


    fetchStudents();
  }, []);

  const createPDF = async () => {
    try {
      const studentRows = students.map(student => (
        `<tr>
          <td>${student.RegNo}</td>
          <td>${student.Name}</td>
          <td>${student.FatherName}</td>
          <td>${student.DOB}</td>
          <td>${student.age}</td>
        </tr>`
      )).join('');

      const htmlContent = `
        <html>
          <head>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
              th { background-color: #b2b2b2; }
            </style>
          </head>
          <body>
            <table>
              <tr>
                <th>Reg No</th>
                <th>Student Name</th>
                <th>Father Name</th>
                <th>Date of Birth</th>
                <th>Age</th>
              </tr>
              ${studentRows}
            </table>
            <hr>
            <p>Total Students: ${students.length}</p>
            <p>Total Boys: ${students.filter(student => student.Gender === 'Male').length}</p>
            <p>Total Girls: ${students.filter(student => student.Gender === 'Female').length}</p>
            <hr>
            <p>Generated on: ${new Date().toLocaleString()}</p>
          </body>
        </html>`;

      let PDFOptions = {
        html: htmlContent,
        fileName: `StudentAgeReport_${Date.now()}`,
        directory: 'Downloads',
      };

      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;

      Alert.alert('PDF saved at', file.filePath);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <ActivityIndicator size="large" color={colors.primary} />}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.addmargin}>Reg No</DataTable.Title>
          <DataTable.Title style={styles.addmargin}>Student Name</DataTable.Title>
          <DataTable.Title style={styles.addmargin}>Date of Birth</DataTable.Title>
          <DataTable.Title style={styles.addmargin}>Age</DataTable.Title>
        </DataTable.Header>
        {students.map((student, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.addmargin}>{student.RegNo}</DataTable.Cell>
            <DataTable.Cell style={styles.addmargin}>{student.Name}</DataTable.Cell>
            <DataTable.Cell style={styles.addmargin}>{student.DOB}</DataTable.Cell>
            <DataTable.Cell style={styles.addmargin}>{student.age}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Button
        title="Download PDF"
        onPress={createPDF}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  addmargin: {
    marginLeft: 5,
  },
});

export default ViewStudentAgeRecordScreen;
