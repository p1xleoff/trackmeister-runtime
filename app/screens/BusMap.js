import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = ({ route }) => {
  const { busStop } = route.params ?? {}; // If busStop is undefined, set it to an empty object
  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

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
        // Handle the case when the busStop parameter is not available
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {userLocation && mapRegion && (
        <MapView
          style={styles.map}
          region={mapRegion}
          showsCompass= {true}
          showsUserLocation={true}
          showsMyLocationButton={false}
        >
          {busStop && (
            <Marker
              coordinate={{
                latitude: busStop.latitude,
                longitude: busStop.longitude,
              }}
              title={busStop.stopName}
            />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
