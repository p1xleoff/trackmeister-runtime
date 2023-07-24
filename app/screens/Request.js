import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const { busLocation, regNo } = route.params ?? {};

  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    if (busLocation) {
      setMapRegion({
        latitude: busLocation.latitude,
        longitude: busLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [busLocation]);

  return (
    <View style={styles.container}>
      {mapRegion && (
        <MapView style={styles.map} region={mapRegion}>
          {busLocation && (
            <Marker
              title={regNo}
                coordinate={{
                  latitude: busLocation.latitude,
                  longitude: busLocation.longitude,
                }}
              >
                <Image source={require('../assets/bus-icon.png')} style={{ width: 55, height: 55 }} />
              </Marker>
          )}
        </MapView>
      )}
      {!mapRegion && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
