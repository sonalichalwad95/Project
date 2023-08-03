import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import size from '../constants/Size';
import AsynchStorage from '../service/AsynchStorage';
import Constants from '../constants/Constants';
import Colors from '../constants/Colors';

const ProvideDetails = ({navigation}: {navigation: any}) => {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const [nextEnabled, setNextEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <AsynchStorage />
      </View>
      <View style={styles.innerContainer}>
        <TextInput
          placeholder={Constants.enter_lat}
          style={styles.buttonText}
          value={lat}
          inputMode="numeric"
          onChangeText={val => setLat(val)}
        />
        <TextInput
          placeholder={Constants.enter_long}
          style={styles.buttonText}
          value={long}
          inputMode="numeric"
          onChangeText={val => setLong(val)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setNextEnabled(true);
          }}
          style={styles.selectButton}>
          <Text style={styles.inputText}> {Constants.save_button}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!nextEnabled}
          onPress={() => {
            navigation.navigate('MeasureDistance', {lat: lat, long: long});
          }}
          style={styles.selectButton}>
          <Text style={styles.inputText}> {Constants.next_button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.backgorund_color,
  },
  innerContainer: {
    padding: 25,
  },
  profileContainer: {
    flex: 0.4,
    padding: 25,
    justifyContent: 'center',
  },

  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    padding: 25,
    justifyContent: 'space-between',
  },
  selectButton: {
    backgroundColor: Colors.button_color,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 140,
    borderRadius: 10,
  },

  inputText: {
    fontSize: size.larger,
    fontWeight: 'bold',
  },

  buttonText: {
    fontSize: size.large,
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default ProvideDetails;
