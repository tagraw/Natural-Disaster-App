import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import fetchDisasterInfo from './api/disasterApi';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
