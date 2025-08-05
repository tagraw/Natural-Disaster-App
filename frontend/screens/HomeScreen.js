import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";

const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";

export default function HomeScreen() {
  const [weatherAlert, setWeatherAlert] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchWeatherAlerts(latitude, longitude);
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const fetchWeatherAlerts = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
      );

      if (response.data.alerts && response.data.alerts.length > 0) {
        setWeatherAlert(response.data.alerts[0]); // show first alert
      } else {
        setWeatherAlert(null); // no disaster
      }
    } catch (error) {
      console.error("Error fetching weather alerts:", error);
    }
  };

  const handleRefresh = () => {
    if (userLocation) {
      fetchWeatherAlerts(userLocation.latitude, userLocation.longitude);
    }
  };

  return (
    <View style={styles.container}>
      {weatherAlert ? (
        <>
          <Text style={styles.alertTitle}>🚨 {weatherAlert.event}</Text>
          <Text>{weatherAlert.description}</Text>
          <Text>🌍 Location: {userLocation?.latitude}, {userLocation?.longitude}</Text>
          <Text>📆 Until: {new Date(weatherAlert.end * 1000).toLocaleString()}</Text>
          <Button title="View Map" onPress={() => {/* show map */}} />
          <Button title="Try AI Assistant" onPress={() => {/* show assistant */}} />
          <Button title="Learn What to Pack" onPress={() => {/* go to packing screen */}} />
        </>
      ) : (
        <>
          <Text style={styles.safe}>✅ All clear in your area</Text>
          <Button title="Refresh" onPress={handleRefresh} />
          <Button title="View Map" onPress={() => {/* show map */}} />
          <Button title="Try AI Assistant" onPress={() => {/* show assistant */}} />
          <Button title="Learn What to Pack" onPress={() => {/* go to packing screen */}} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10
  },
  safe: {
    fontSize: 18,
    color: "green",
    marginBottom: 10
  }
});
