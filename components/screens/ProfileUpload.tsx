import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s3 from '../service/awsConfig';
import Colors from '../constants/Colors';
import size from '../constants/Size';
import Constants from '../constants/Constants';
import ProvideDetails from './ProvideDetails';

const ProfileUpload = ({navigation}: {navigation: any}) => {
  const [galleryPhoto, setGalleryPhoto] = useState('');

  let options: any = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openGallery = async () => {
    const result: any = await launchImageLibrary(options);
    setGalleryPhoto(result?.assets[0]?.uri);
  };

  const selectPicture = () => {
    openGallery();
    <Image source={{uri: galleryPhoto}} />;
  };

  const storePicture = async () => {
    try {
      await AsyncStorage.setItem('uri', galleryPhoto);
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const uploadImage = (uri: any) => {
    const fileName = uri.split('/').pop();

    const file = {
      uri: uri,
      name: fileName,
      type: 'image/jpg',
    };

    const options = {
      Bucket: 'equip-testing',
      Key: 'images/' + fileName,
      ContentType: 'image/jpg',
      ACL: 'public-read',
    };

    s3.putObject(options, (err: any, data: any) => {
      if (err) {
      } else {
        Alert.alert('Image uploaded successfully');
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          selectPicture();
        }}
        style={styles.selectButton}>
        <Text style={styles.buttonText}>{Constants.select_picture}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => {
          uploadImage(galleryPhoto);
          storePicture();
          navigation.navigate(ProvideDetails);
        }}>
        <Text style={styles.buttonText}> {Constants.upload_picture}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.backgorund_color,
  },
  selectButton: {
    backgroundColor: Colors.button_color,
    padding: 15,
    borderRadius: 10,
  },
  uploadButton: {
    backgroundColor: Colors.button_color,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: size.large,
    fontWeight: 'bold',
  },
});

export default ProfileUpload;
