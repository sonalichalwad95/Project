import {View, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileUpload from './components/screens/ProfileUpload';
import ProvideDetails from './components/screens/ProvideDetails';
import MeasureDistance from './components/screens/MeasureDistance';
import Colors from './components/constants/Colors';

const Stack = createNativeStackNavigator();

const App = () => {
  const HomeScreen = ({navigation}: {navigation: any}) => {
    return (
      <View style={styles.container}>
        <ProfileUpload navigation={navigation} />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="ProfileUpload"
          options={{headerShown: false}}
          component={ProfileUpload}
        />
        <Stack.Screen
          name="ProvideDetails"
          options={{headerShown: false}}
          component={ProvideDetails}
        />
        <Stack.Screen
          name="MeasureDistance"
          options={{headerShown: false}}
          component={MeasureDistance}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    backgroundColor: Colors.backgorund_color,
  },
});

export default App;
