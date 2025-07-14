import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import fetchDisasterInfo from './frontend/api/disasterApi';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons } from '@expo/vector-icons';

import HomeScreen from './frontend/screens/HomeScreen';
import MapScreen from './frontend/screens/MapScreen';
import AIScreen from './frontend/screens/AIScreen';
import PackScreen from './frontend/screens/PackScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [location, setLocation] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Please allow location permissions to use this app');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      const { latitude, longitude } = currentLocation.coords;
      const risks = await fetchDisasterInfo(latitude, longitude);
      console.log('Current location:', currentLocation);
    };
    getPermissions();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Map') {
              iconName = 'map-outline';
            } else if (route.name === 'AI Assistant') {
              iconName = 'chatbubble-ellipses-outline';
            } else if (route.name === 'Pack') {
              iconName = 'briefcase-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          
          tabBarStyle: { backgroundColor: '#251759' },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#aaa',
        }) }
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="AI Assistant" component={AIScreen} />
        <Tab.Screen name="Pack" component={PackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#251759',
    alignItems: 'center',
    justifyContent: 'center',
  },
});