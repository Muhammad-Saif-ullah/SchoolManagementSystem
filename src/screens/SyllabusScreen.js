import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import colors from '../styles/colors';

const getImageUrlName = (classname) => {
  switch (classname) {
    case 'Nursery':
      return 'nursery_syllabus.png';
    case 'Prep':
      return 'prep_syllabus.png';
    case 'Class 1':
      return 'class_1_syllabus.png';
    case 'Class 2':
      return 'class_2_syllabus.png';
    case 'Class 3':
      return 'class_3_syllabus.png';
    case 'Class 4':
      return 'class_4_syllabus.png';
    case 'Class 5':
      return 'class_5_syllabus.png';
    case 'Class 6':
      return 'class_6_syllabus.png';
    case 'Class 7':
      return 'class_7_syllabus.png';
    case 'Class 8':
      return 'class_8_syllabus.png';
    default:
      return null;
  }
};

const SyllabusDisplay = ({ classname, imageUrl }) => {
  return <>
    <Text style={styles.heading}>{classname}</Text>
    {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
    <Button
      mode="outlined"
      style={{ marginTop: 10, borderColor: colors.primary }}
      onPress={() => uploadImage(getImageUrlName(classname))}>
      Upload
    </Button>
    <Button
      mode="contained"
      style={{ marginTop: 10, backgroundColor: colors.primary }}
      onPress={() => {
        Alert.alert('Delete', 'Are you sure you want to delete this image?', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                await storage().ref(getImageUrlName(classname)).delete();
                Alert.alert('Success', 'Image deleted successfully!');
              } catch (error) {
                Alert.alert('Error', 'Image deletion failed: ' + error.message);
              }
            },
          },
        ]);
      }}>
      Delete
    </Button>
    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 10 }} />
  </>
};

const uploadImage = (imageNameUrl) => {
  launchImageLibrary({ mediaType: 'photo' }, async response => {
    if (response.didCancel) {
      return;
    } else if (response.error) {
      Alert.alert('Error', 'Image selection failed: ' + response.error);
      return;
    }

    const { uri } = response.assets[0];
    const storageRef = storage().ref(imageNameUrl);
    const uploadTask = storageRef.putFile(uri);

    Alert.alert('Info', 'Uploading image...');

    uploadTask.on(
      'state_changed',
      snapshot => {
        console.log('\rImage upload progress: ', snapshot.bytesTransferred);
      },
      error => {
        Alert.alert('Error', 'Image upload failed: ' + error.message);
      },
      () => {
        Alert.alert('Success', 'Image uploaded successfully!');
      }
    );
  });
};

const SyllabusScreen = ({ navigation }) => {
  const [NurseryImageUrl, setNurseryImageUrl] = useState('');
  const [PrepImageUrl, setPrepImageUrl] = useState('');
  const [Class1ImageUrl, setClass1ImageUrl] = useState('');
  const [Class2ImageUrl, setClass2ImageUrl] = useState('');
  const [Class3ImageUrl, setClass3ImageUrl] = useState('');
  const [Class4ImageUrl, setClass4ImageUrl] = useState('');
  const [Class5ImageUrl, setClass5ImageUrl] = useState('');
  const [Class6ImageUrl, setClass6ImageUrl] = useState('');
  const [Class7ImageUrl, setClass7ImageUrl] = useState('');
  const [Class8ImageUrl, setClass8ImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImageUrl() {
      const NUrl = await getImageUrl('nursery_syllabus.png');
      setNurseryImageUrl(NUrl);

      const PUrl = await getImageUrl('prep_syllabus.png');
      setPrepImageUrl(PUrl);

      const C1Url = await getImageUrl('class_1_syllabus.png');
      setClass1ImageUrl(C1Url);

      const C2Url = await getImageUrl('class_2_syllabus.png');
      setClass2ImageUrl(C2Url);

      const C3Url = await getImageUrl('class_3_syllabus.png');
      setClass3ImageUrl(C3Url);

      const C4Url = await getImageUrl('class_4_syllabus.png');
      setClass4ImageUrl(C4Url);

      const C5Url = await getImageUrl('class_5_syllabus.png');
      setClass5ImageUrl(C5Url);

      const C6Url = await getImageUrl('class_6_syllabus.png');
      setClass6ImageUrl(C6Url);

      const C7Url = await getImageUrl('class_7_syllabus.png');
      setClass7ImageUrl(C7Url);

      const C8Url = await getImageUrl('class_8_syllabus.png');
      setClass8ImageUrl(C8Url);
    }
    setLoading(false);

    fetchImageUrl();
  }, []);

  async function getImageUrl(imagePath) {
    try {
      const url = await storage().ref(imagePath).getDownloadURL();
      return url;
    } catch (error) {
      console.log('Error getting image URL: ', error);
      return null;
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
  { loading && <ActivityIndicator size="large" color={colors.primary} />}
  <SyllabusDisplay classname="Nursery" imageUrl={NurseryImageUrl} />
  <SyllabusDisplay classname="Prep" imageUrl={PrepImageUrl} />
  <SyllabusDisplay classname="Class 1" imageUrl={Class1ImageUrl} />
  <SyllabusDisplay classname="Class 2" imageUrl={Class2ImageUrl} />
  <SyllabusDisplay classname="Class 3" imageUrl={Class3ImageUrl} />
  <SyllabusDisplay classname="Class 4" imageUrl={Class4ImageUrl} />
  <SyllabusDisplay classname="Class 5" imageUrl={Class5ImageUrl} />
  <SyllabusDisplay classname="Class 6" imageUrl={Class6ImageUrl} />
  <SyllabusDisplay classname="Class 7" imageUrl={Class7ImageUrl} />
  <SyllabusDisplay classname="Class 8" imageUrl={Class8ImageUrl} />
</ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default SyllabusScreen;
