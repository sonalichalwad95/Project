import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Constants from '../constants/Constants';
import size from '../constants/Size';
import Colors from '../constants/Colors';
import AsynchStorage from '../service/AsynchStorage';

var haversine = require('haversine-distance');

const MeasureDistance = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [newLat, setNewLat] = useState('');
  const [newLong, setNewLong] = useState('');

  const [distanceKm, setDistanceKm] = useState('');
  const [distanceMiles, setDistanceMiles] = useState('');

  const calculateDistance = () => {
    var point1 = {lat: route?.params?.lat, lng: route?.params?.long};
    var point2 = {lat: newLat, lng: newLong};

    const haversine_m: any = haversine(point1, point2);
    const haversine_km: any = haversine_m / 1000;
    const havensine_miles: any = haversine_km * 0.621371;

    setDistanceKm(haversine_km);
    setDistanceMiles(havensine_miles);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <AsynchStorage />
      </View>
      <View style={styles.innerContainer}>
        <TextInput
          placeholder="Enter Latitude"
          style={styles.buttonText}
          value={newLat}
          inputMode="numeric"
          onChangeText={val => setNewLat(val)}
        />
        <TextInput
          placeholder="Enter Longitude"
          style={styles.buttonText}
          value={newLong}
          inputMode="numeric"
          onChangeText={val => setNewLong(val)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.selectButton}>
          <Text style={styles.inputText}> {Constants.previous_button}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            calculateDistance();
          }}
          style={styles.selectButton}>
          <Text style={styles.inputText}> {Constants.calculate_button}</Text>
        </TouchableOpacity>
      </View>
      {distanceMiles && distanceKm && (
        <View style={styles.valueContainer}>
          <Text style={styles.titleText}>
            {Constants.distance_km} :
            <Text style={styles.valText}> {distanceKm}</Text>
          </Text>

          <Text style={styles.titleText}>
            {Constants.distance_miles} :
            <Text style={styles.valText}> {distanceMiles} </Text>
          </Text>
        </View>
      )}
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
    flex: 0.45,
    padding: 25,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    padding: 25,
    justifyContent: 'space-between',
  },
  valueContainer: {
    flex: 0.1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  titleText: {
    fontSize: size.larger,
    fontWeight: 'bold',
  },

  valText: {
    fontSize: size.large,
    fontWeight: 'normal',
  },
});

export default MeasureDistance;
