import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { GMAPS_KEY } from '@env';

function DeMap() {
  const [busStops, setBusStops] = useState([]);
  const [selectedBusStops, setSelectedBusStops] = useState([]);

  useEffect(() => {
    const busStopsRef = ref(getDatabase(), 'busStops/');

    const handleData = (snapshot) => {
      const busStopsData = snapshot.val();
      if (busStopsData) {
        const busStopsArray = Object.values(busStopsData);
        setBusStops(busStopsArray);
      }
    };

    onValue(busStopsRef, handleData);

    return () => {
      off(busStopsRef, 'value', handleData);
    };
  }, []);

  const handleBusStopPress = (busStop) => {
    if (selectedBusStops.length === 2) {
      setSelectedBusStops([busStop]);
    } else {
      setSelectedBusStops([...selectedBusStops, busStop]);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 15.4064,
          longitude: 73.9971,
          latitudeDelta: 0.0500,
          longitudeDelta: 0.0500,
        }}
      >
        {busStops.map((busStop) => (
          <Marker
            key={busStop.stopId}
            coordinate={{ latitude: busStop.latitude, longitude: busStop.longitude }}
            title={busStop.stopName}
            description={busStop.address}
            // Use a custom marker icon instead of `pinColor`
            // e.g., `image={require('./path/to/marker-icon.png')}`
            pinColor='blue'
            onPress={() => handleBusStopPress(busStop)}
          />
        ))}

        {/* Draw the polyline for the selected bus stops */}
        {selectedBusStops.length >= 2 && (
          <MapViewDirections
            origin={{
              latitude: selectedBusStops[0].latitude,
              longitude: selectedBusStops[0].longitude,
            }}
            destination={{
              latitude: selectedBusStops[1].latitude,
              longitude: selectedBusStops[1].longitude,
            }}
            apikey={GMAPS_KEY}
            strokeWidth={4}
            strokeColor="red"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default DeMap;
