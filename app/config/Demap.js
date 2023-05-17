import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const DeMap = () => {
  const [busStops, setBusStops] = useState([]);

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
{busStops.map((busStops) => (
  <Marker
    key={busStops.stopId} // Use a unique identifier such as "id"
    coordinate={{ latitude: busStops.latitude, longitude: busStops.longitude }}
    title={busStops.stopName}
    description={busStops.address}
    pinColor='blue'
  />
))}
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

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <DeMap />
    </View>
  );
}
