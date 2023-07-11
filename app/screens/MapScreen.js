import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import themeContext from "../config/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBar from '../components/SearchBar';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import MapViewDirections from 'react-native-maps-directions';
import { GMAPS_KEY } from '@env';

const MapScreen = ({ route }) => {
  const { busStop } = route?.params ?? {};

  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [selectedBusStop, setSelectedBusStop] = useState(null);

  const theme = useContext(themeContext);
  const styles = getStyles(theme);

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

  const focusUserLocation = () => {
    setSelectedBusStop(null);
    if (userLocation) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const mapRef = React.createRef();

  return (
    <View style={styles.container}>
      {userLocation && mapRegion && (
        <MapView style={styles.map} 
          region={mapRegion}
          ref={mapRef}
          showsCompass= {true}
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
              pinColor='green'
              onPress={() => setSelectedBusStop(stop)}
            />
          ))}
          {selectedBusStop && (
            <MapViewDirections
              origin={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              destination={{
                latitude: selectedBusStop.latitude,
                longitude: selectedBusStop.longitude,
              }}
              apikey={GMAPS_KEY}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
        </MapView>
      )}

      {!userLocation && <ActivityIndicator style={styles.loader} size="large" color={theme.accent} />}

      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <SearchBar />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={focusUserLocation}>
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons style={styles.icon} name="crosshairs-gps" />
            <Text style={styles.buttonText}>Focus On Your Location</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    map: {
      flex: 1,
    },
    searchBarContainer: {
      position: 'absolute',
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

export default MapScreen;
