import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";

// Get your API key from app.config.js or app.json
const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;

export default function MapScreen({ location }) {
  const [showDirections, setShowDirections] = useState(false);
  const [destination, setDestination] = useState(null);
  const [shelters, setShelters] = useState([]);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Fetching your location...</Text>
      </View>
    );
  }

  const userCoords = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };

    const handleEvacuationRoute = () => {
  const distanceInDegrees = 0.3; // approx 30 km northward

  setDestination({
    latitude: userCoords.latitude + distanceInDegrees,
    longitude: userCoords.longitude,
  });

  setShowDirections(true);
};

  const handleFindShelters = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userCoords.latitude},${userCoords.longitude}&radius=10000&type=point_of_interest&keyword=people-shelter&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      setShelters(data.results);
    } catch (err) {
      console.error("Error fetching shelters:", err);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          ...userCoords,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={userCoords} title="You are here" />

        {showDirections && destination && (
          <>
            <Marker coordinate={destination} title="Evacuation Point" />
            <MapViewDirections
              origin={userCoords}
              destination={destination}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={4}
              strokeColor="blue"
            />
          </>
        )}

        {shelters.map((shelter, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: shelter.geometry.location.lat,
              longitude: shelter.geometry.location.lng,
            }}
            title={shelter.name}
            description={shelter.vicinity}
          />
        ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFindShelters}>
          <Text style={styles.buttonText}>Find Nearest Shelters</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleEvacuationRoute}>
          <Text style={styles.buttonText}>Evacuation Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: "column",
    gap: 10,
  },
  button: {
    backgroundColor: "#29186A",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingText: {
    color: "gray",
    marginTop: 50,
    textAlign: "center",
  },
});
