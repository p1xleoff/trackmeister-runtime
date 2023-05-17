import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getLastKnownPositionAsync, watchPositionAsync } from 'expo-location';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import themeContext from "../config/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBar from '../components/SearchBar';

const Map = () => {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  const [busStops, setBusStops] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const busStopsRef = ref(getDatabase(), 'busStops');

    const handleData = (snapshot) => {
      const busStopsData = snapshot.val();
      if (busStopsData) {
        const busStopsArray = Object.values(busStopsData);
        setBusStops(busStopsArray);
      }
    };

    onValue(busStopsRef, handleData);

    // Request location permissions
    const requestLocationPermission = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === 'granted') {
        // Get the user's last known position
        const location = await getLastKnownPositionAsync({});
        if (location) {
          setUserLocation(location.coords);
        }
        // Watch for location updates
        const locationWatchId = watchPositionAsync({}, (location) => {
          setUserLocation(location.coords);
        });
        return () => {
          off(busStopsRef, 'value', handleData);
          // Clear the location watch when the component unmounts
          locationWatchId.remove();
        };
      }
    };

    requestLocationPermission();
  }, []);

  const focusUserLocation = () => {
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
      {userLocation && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsCompass= {true}
          showsUserLocation={true}
          loadingEnabled={true}
          showsMyLocationButton={false}
        >
          {busStops.map((busStops) => (
            <Marker
              key={busStops.stopId}
              coordinate={{ latitude: busStops.latitude, longitude: busStops.longitude }}
              title={busStops.stopName}
              description={busStops.address}
              pinColor='blue'
            />
          ))}
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
        <MaterialCommunityIcons style={styles.icon} name='crosshairs-gps'/>
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
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
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

export default Map;
