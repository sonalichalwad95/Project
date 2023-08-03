import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import size from '../constants/Size';
import Colors from '../constants/Colors';
import Constants from '../constants/Constants';

const AsynchStorage = () => {
  const [picture, setPicture] = useState('');

  useEffect(() => {
    getProfilePic();
  }, []);

  const getProfilePic = async () => {
    try {
      const data: any = await AsyncStorage.getItem('uri');
      setPicture(data);
    } catch (e) {}
  };

  return (
    <View style={styles.profileContainer}>
      <Image style={styles.profile} source={{uri: picture}} />
      <Text style={styles.imageTitle}> {Constants.uploaded_pic}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 0.3,
    padding: 25,
    justifyContent: 'center',
  },

  profile: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: Colors.border_color,
    borderWidth: 1,
    alignSelf: 'center',
  },

  imageTitle: {
    paddingTop: 5,
    fontSize: size.large,
    alignSelf: 'center',
    fontWeight: '500',
  },
});

export default AsynchStorage;
