import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const SearchAndMapScreen = () => {
  const [busStops, setBusStops] = useState([]);
  const [selectedBusStop, setSelectedBusStop] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {


    // Fetch bus stops from Firebase Realtime Database
    const db = getDatabase();
    const busStopsRef = ref(db, 'busStops');
    onValue(busStopsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const busStopsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBusStops(busStopsArray);
      }
    });

    // Request user's location using Expo's Location service
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();

    return () => {
      // Clean up listeners or resources if needed
      off(busStopsRef);
    };
  }, []);

  const handleBusStopSelect = (busStop) => {
    setSelectedBusStop(busStop);
  };

  const renderBusStopItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleBusStopSelect(item)} style={styles.busStopItem}>
        <Text style={styles.busStopName}>{item.stopName}</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={busStops}
          keyExtractor={(item) => item.id}
          renderItem={renderBusStopItem}
        />
      </View>
      <View style={styles.mapContainer}>
        {userLocation && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {selectedBusStop && (
              <Marker
                coordinate={{
                  latitude: selectedBusStop.latitude,
                  longitude: selectedBusStop.longitude,
                }}
              />
            )}
          </MapView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Add this line
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'white', // Add this line
  },
  mapContainer: {
    flex: 2,
    backgroundColor: 'white', // Add this line
  },
  map: {
    flex: 1,
  },
  busStopItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  busStopName: {
    fontSize: 16,
    color: 'black',
  },
});


export default SearchAndMapScreen;
