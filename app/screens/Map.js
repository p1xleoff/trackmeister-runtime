import React, { useContext, useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

import SearchBar from "../components/SearchBar";
import themeContext from "../config/themeContext";

import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { MaterialCommunityIcons } from "@expo/vector-icons";

function Map() {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [region, setRegion] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const mapRef = useRef(null);
  const [busStops, setBusStops] = useState([]);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setCurrentLocationMarker({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
          // Get bus stop coordinates from API
          if (currentLocationMarker) {
          const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocationMarker.latitude},${currentLocationMarker.longitude}&radius=995&type=bus_station&key=AIzaSyB0EBCZbMVu9ZeD_3WAugs1Uj1HccdsX0g`);
          const data = await response.json();
          setBusStops(data);
          }
    })();
  }, []);

  if (!region) {
    return null;
  }
  //focus on location
  const handlePress = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocationMarker.latitude,
        longitude: currentLocationMarker.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
      >
        {currentLocationMarker && (
          <Marker
            coordinate={currentLocationMarker}
          />
        )}
          {busStops.length > 0 && busStops.map((busStop, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: busStop.latitude,
                longitude: busStop.longitude,
              }}
              title={busStop.name}
            />
          ))}
      </MapView>
      <View style={{flex: 1, position: 'absolute', width: '90%', top: 100}}>
      <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyB0EBCZbMVu9ZeD_3WAugs1Uj1HccdsX0g',
        language: 'en',
      }}
    />
      </View>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <SearchBar />
        </View>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <View style={styles.buttonContent}>
        <MaterialCommunityIcons style={styles.icon} name='crosshairs-gps'/>
        <Text style={styles.buttonText}>Focus On Your Location</Text>
        </View>
    </TouchableOpacity>
        </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    map: {
      flex: 1,
    },
    searchBarContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    buttonContent:  {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      backgroundColor: theme.accent,
      padding: 16,
      borderRadius: 29,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
    },
    icon: {
      fontSize: 24,
      paddingRight: 5,
      color: 'black',
    }
  });

export default Map;
