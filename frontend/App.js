import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import fetchDisasterInfo from './api/disasterApi';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import AIScreen from './screens/AIScreen';
import PackScreen from './screens/PackScreen';

const Stack = createNativeStackNavigator();


export default function App() {

  const [location, setLocation] = useState();
  useEffect(() => {
    const getPermissions = async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if ( status !== 'granted') {
        console.log('Please allow location permissions to use this app');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      const { latitude, longitude } = currentLocation.coords;
      const risks = await fetchDisasterInfo(latitude, longitude);
      console.log('Current location:', currentLocation);
    }
    getPermissions();
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="AI Assistant" component={AIScreen} />
        <Stack.Screen name="Pack" component={PackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
