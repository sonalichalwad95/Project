import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import size from '../../../components/constants/Size';

const Screen1 = () => {
  const [cameraPhoto, setCameraPhoto] = useState();
  const [galleryPhoto, setGalleryPhoto] = useState();

  let options: any = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result: any = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
      setCameraPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result: any = await launchImageLibrary(options);
    setGalleryPhoto(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <Image source={{uri: cameraPhoto}} />

      <TouchableOpacity onPress={openGallery} style={styles.button}>
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableOpacity>
      <Image source={{uri: galleryPhoto}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 30, alignItems: 'center'},
  button: {
    backgroundColor: '#ffa500',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: size.large,
    fontWeight: 'bold',
  },
});

export default Screen1;
