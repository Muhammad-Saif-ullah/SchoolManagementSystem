import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { DataTable } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import colors from '../styles/colors';

const getClasswiseSubjects = (assignedClass) => {
  let subjects = [];
  switch (assignedClass) {
    case 'Nursery':
      subjects = ['English', 'Urdu', 'Maths', 'Nazara-e-Quran'];
      break;
    case 'Prep':
      subjects = ['English', 'Urdu', 'Maths', 'Nazara-e-Quran', 'General Knowledge'];
      break;
    case 'Class 1':
      subjects = ['English', 'Urdu', 'Maths', 'General Knowledge', 'Islamyat'];
      break;
    case 'Class 2':
    case 'Class 3':
      subjects = ['English', 'Urdu', 'Maths', 'General Knowledge', 'Islamyat', 'Computer Part 1', 'Computer Part 2'];
      break;
    case 'Class 4':
    case 'Class 5':
      subjects = ['English', 'Urdu', 'Maths', 'General Knowledge', 'Islamyat', 'Computer Part 1', 'Computer Part 2', 'Social Study'];
      break;
    case 'Class 6':
    case 'Class 7':
    case 'Class 8':
      subjects = ['English', 'Urdu', 'Maths', 'General Knowledge', 'Islamyat', 'Computer Part 1', 'Computer Part 2', 'Social Study', 'Quran'];
      break;
  }
  return subjects;
};

const ResultSheetScreen = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        let finalStudent = {};

        const studentsSnapshot = await firestore().collection('Students').get();

        const studentsData = await Promise.all(studentsSnapshot.docs.map(async doc => {

          const student = doc.data();

          const marksSnapshot = await firestore().collection('Students').doc(doc.id).collection('Marks').get();

          for (const subject in getClasswiseSubjects(student.AdmissionClass._documentPath._parts[1])) {

            const marksData = await Promise.all(marksSnapshot.docs.map(async subDoc => {

              const subMarksSnapshot = await firestore().collection('Students').doc(doc.id).collection('Marks').doc(subDoc.id).collection(subject).get();

              const subMarks = subMarksSnapshot.docs.reduce((acc, markDoc) => {
                const { FirstTerm = 0, MidTerm = 0, FinalTerm = 0 } = markDoc.data();
                acc[markDoc.id] = { FirstTerm, MidTerm, FinalTerm };

                return acc;
              }, {});

              return { [subDoc.id]: subMarks };
            }));

            const marks = marksData.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            finalStudent = { ...student, marks };
          }

          return finalStudent;

        }));

        setStudents(studentsData);
      } 
      catch (error) {
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
      const studentRows = await Promise.all(students.map(async student => {
        const classDoc = await student.AdmissionClass.get();
        const classData = classDoc.data();

        const subjects = classData.Subjects.map(subject => {
          const subjectMarks = student.marks[subject] || { FirstTerm: 0, MidTerm: 0, FinalTerm: 0 };
          return `
            <td>${subjectMarks.FirstTerm}</td>
            <td>${subjectMarks.MidTerm}</td>
            <td>${subjectMarks.FinalTerm}</td>
          `;
        }).join('');

        return `
          <tr>
            <td>${student.RegNo}</td>
            <td>${student.Name}</td>
            <td>${student.FatherName}</td>
            <td>${classData.ClassName}</td>
            ${subjects}
          </tr>
        `;
      }));

      const classHeaders = students.length > 0 ?
        (await students[0].AdmissionClass.get()).data().Subjects.map(subject => `
          <th>${subject} FirstTerm</th>
          <th>${subject} MidTerm</th>
          <th>${subject} FinalTerm</th>
        `).join('') : '';

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
                <th>Class</th>
                ${classHeaders}
              </tr>
              ${studentRows.join('')}
            </table>
            <hr>
            <p>Total Students: ${students.length}</p>
            <p>Generated on: ${new Date().toLocaleString()}</p>
          </body>
        </html>`;

      const PDFOptions = {
        html: htmlContent,
        fileName: `ResultSheet_${Date.now()}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(PDFOptions);
      if (file.filePath) {
        Alert.alert('PDF saved at', file.filePath);
      } else {
        throw new Error('File path not available');
      }
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
          <DataTable.Title style={styles.addmargin}>Father Name</DataTable.Title>
          <DataTable.Title style={styles.addmargin}>Class</DataTable.Title>
          {/* Add more columns as needed */}
        </DataTable.Header>
        {students.map((student, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.addmargin}>{student.RegNo}</DataTable.Cell>
            <DataTable.Cell style={styles.addmargin}>{student.Name}</DataTable.Cell>
            <DataTable.Cell style={styles.addmargin}>{student.FatherName}</DataTable.Cell>
            <DataTable.Cell style={styles.addmargin}>{student.AdmissionClass.id}</DataTable.Cell>
            {/* Add more cells as needed */}
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

export default ResultSheetScreen;