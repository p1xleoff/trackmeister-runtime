import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import themeContext from "../config/themeContext";
import SearchBar from "../components/SearchBar";

const StopsMap = () => {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [markers, setMarkers] = useState([]);
  const apikey = 'AIzaSyAGQs7_a1qpQumNVgubJ2ub2Egqc1fx12I';
  const mapRef = useRef(null);
  const [locationFocus, setLocationFocus] = useState(null);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    const getLocationAsync = async () => {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0150,
        longitudeDelta: 0.0150,
      });
      setLocationFocus({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };
    getLocationAsync();
  }, []);

  if (!location) {
    return null;
  }

  const getNearbyBusStops = async () => {
    const radius = 1000;
    const keywords = ['bus stop', 'bus stand'];
    let busStops = [];

    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=[bus_station, transit_station]&keyword=${keyword}&key=${apikey}`
      );
      const data = await response.json();
      busStops = [...busStops, ...data.results];
    }

    // Deduplicate the results
    busStops = [...new Map(busStops.map((item) => [item.place_id, item])).values()];

    // Add markers to the map
    const markers = busStops.map((busStop) => {
      return {
        id: busStop.place_id,
        latitude: busStop.geometry.location.lat,
        longitude: busStop.geometry.location.lng,
        title: busStop.name,
        description: busStop.vicinity,
      };
    });

    setMarkers(markers);
  };
  const focusUserLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: locationFocus.latitude,
        longitude: locationFocus.longitude,
        latitudeDelta: 0.0150,
        longitudeDelta: 0.0150,
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      showsUserLocation={true}
      showsBuildings={false}
      loadingEnabled={true}
      showsMyLocationButton={false}
       ref={mapRef}
       region={location}>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            pinColor= "navy"
            tracksViewChanges={false}
          />
        ))}
      </MapView>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <SearchBar />
        </View>
      </View>     
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={focusUserLocation}>
        <View style={styles.buttonContent}>
        <MaterialCommunityIcons style={styles.icon} name='crosshairs-gps'/>
        <Text style={styles.buttonText}>Focus On Your Location</Text>
        </View>
    </TouchableOpacity>      
        </View>
        <Button title="Show Nearby Bus Stops" onPress={getNearbyBusStops}/>
      </View>
  );
};

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
      bottom: 50,
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
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold'
    },
    icon: {
      fontSize: 22,
      paddingRight: 5,
      color: '#fff',
    }
  });

export default StopsMap;
