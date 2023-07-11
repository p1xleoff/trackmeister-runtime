import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import themeContext from "../config/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { GMAPS_KEY } from '@env';


const MapScreen = ({ route }) => {
  const { busStop } = route?.params ?? {};
  
  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [selectedBusStop, setSelectedBusStop] = useState(null);
  const [busRouteCoordinates, setBusRouteCoordinates] = useState([]);

  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  const [showTrackBusButton, setShowTrackBusButton] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const makeApiRequest = async () => {
    try {
      const timestamp = new Date().getTime();
      const url = `http://65.1.176.163:3000/api?timestamp=${timestamp}`;
      const vehicleNumbers = ['GA08V4965', 'GA0B4966', 'GA08V4967', 'GA08V4968', 'GA08V4972', 'GA08V4973', 'GA08V4974',
                              'GA08V4975', 'GA08V4976', 'GA08V4977', 'GA08V4978', 'GA08V4979', 'GA08V4980', 'GA08V4981',
                              'GA08V4982', 'GA08V4983', 'GA08V4984', 'GA08V4985', 'GA08V4986', 'GA08V4987'];
      const fetchedData = [];
      for (const vehicleNumber of vehicleNumbers) {
        const payload = {
          VehicleRegNo: vehicleNumber
        };
        const response = await axios.post(url, payload);
        // console.log(response.data);
        if (response.data.VehicleDetail.length > 0) {
          const vehicle = response.data.VehicleDetail[0];
          if (vehicle.EngineStatus === 'On') {
            fetchedData.push(vehicle);
          }
        }
      }
      //console.log(fetchedData);
      setResponseData(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to calculate the distance between two coordinates using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };
  
  // Function to find the closest bus to the selected bus stop
  const findClosestBus = () => {
    if (selectedBusStop && responseData && responseData.length > 0) {
      let closestBus = responseData[0];
      let minDistance = calculateDistance(
        selectedBusStop.latitude,
        selectedBusStop.longitude,
        closestBus.Latitude,
        closestBus.Longitude
      );
  
      for (let i = 1; i < responseData.length; i++) {
        const distance = calculateDistance(
          selectedBusStop.latitude,
          selectedBusStop.longitude,
          responseData[i].Latitude,
          responseData[i].Longitude
        );
  
        if (distance < minDistance) {
          closestBus = responseData[i];
          minDistance = distance;
        }
      }
  
      return closestBus;
    }
  
    return null;
  };

  const closestBus = findClosestBus();

  const handleBusStopPress = (busStop) => {
    setSelectedBusStop(busStop);
    setShowTrackBusButton(true);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);

      if (busStop) {
        setMapRegion({
          latitude: busStop.latitude,
          longitude: busStop.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const busStopsRef = ref(db, 'busStops');

    const handleSnapshot = (snapshot) => {
      const stops = [];
      snapshot.forEach((childSnapshot) => {
        const busStopData = childSnapshot.val();
        stops.push(busStopData);
      });
      setBusStops(stops);
    };

    const onDataLoad = onValue(busStopsRef, handleSnapshot);

    return () => {
      off(busStopsRef, onDataLoad);
    };
  }, []);

  const mapRef = useRef(null);

  const focusUserLocation = () => {
    setSelectedBusStop(null);
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View style={styles.container}>
    {userLocation && mapRegion && (
      <MapView 
        style={styles.map} 
        region={mapRegion}
        ref={mapRef}
        showsCompass={true}
        showsUserLocation={true}
        showsMyLocationButton={false}
        userInterfaceStyle='dark'
      >
        {busStops.map((stop) => (
          <Marker
            key={stop.stopId}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            title={stop.stopName}
            description={stop.address}
            pinColor='#0362fc'
            onPress={() => handleBusStopPress(stop)}
          />
        ))}
        {selectedBusStop && (
          <MapViewDirections
            origin={{
              latitude: closestBus ? closestBus.Latitude : userLocation.latitude,
              longitude: closestBus ? closestBus.Longitude : userLocation.longitude,
            }}
            destination={{
              latitude: selectedBusStop.latitude,
              longitude: selectedBusStop.longitude,
            }}
            apikey={GMAPS_KEY}
            strokeWidth={4}
            strokeColor="red"
            onReady={(result) => {
              setBusRouteCoordinates(result.coordinates);
            }}
          />
        )}

        {busRouteCoordinates.length > 0 && (
          <Polyline
            coordinates={busRouteCoordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
          {closestBus && (
            <Marker
              coordinate={{
                latitude: closestBus.Latitude,
                longitude: closestBus.Longitude,
              }}
            >
              <Image source={require('../assets/bus-icon.png')} style={{ width: 55, height: 55 }} />
            </Marker>
          )}
      </MapView>
    )}
      {!userLocation && <ActivityIndicator style={styles.loader} size="large" color={theme.accent} />}

      <View style={styles.buttonContainer}>
      {showTrackBusButton && ( // Only show the button when showTrackBusButton is true
        <TouchableOpacity style={styles.button} onPress={makeApiRequest}>
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons style={styles.icon} name="crosshairs-gps" />
            <Text style={styles.buttonText}>Track Bus</Text>
          </View>
        </TouchableOpacity>
      )}

        <TouchableOpacity style={styles.button} onPress={focusUserLocation}>
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons style={styles.icon} name="crosshairs-gps" />
            <Text style={styles.buttonText}>Focus On User Location</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    map: {
      flex: 1,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      backgroundColor: theme.accent,
      padding: 16,
      borderRadius: 29,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    icon: {
      fontSize: 22,
      paddingRight: 5,
      color: '#fff',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default MapScreen;
