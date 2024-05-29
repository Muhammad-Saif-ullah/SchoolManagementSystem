import React, { useState, useEffect } from 'react';
import { View, Image, Button, Alert, StyleSheet } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImageUrl() {
      const url = await getImageUrl('path/to/your/image.jpg'); // replace with your image path
      setImageUrl(url);
    }

    fetchImageUrl();
  }, []);

  const uploadImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        Alert.alert('Error', 'Image selection failed: ' + response.error);
        return;
      }

      const { uri } = response.assets[0];
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = storage().ref(filename);

      const uploadTask = storageRef.putFile(uri);

      uploadTask.on(
        'state_changed',
        snapshot => {
          console.log('\rImage upload progress: ', snapshot.bytesTransferred);
        },
        error => {
          Alert.alert('Error', 'Image upload failed: ' + error.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            setImageUrl(downloadURL);
            Alert.alert('Success', 'Image uploaded successfully!');
          });
        },
      );
    });
  };

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
    <View style={styles.container}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default App;
