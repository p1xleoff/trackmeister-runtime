import React, { useContext, useState, useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import SearchBar from "../components/SearchBar";
import themeContext from "../config/themeContext";

import * as Location from 'expo-location';

function Map() {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  const [region, setRegion] = useState(null);
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
    })();
  }, []);

  if (!region) {
    return null;
  }

  //const customMap = require('../config/pxMapStyle.json');
  return (
    <View style={styles.container}>
      <MapView
        //customMapStyle={customMap}
        style={styles.map}
        initialRegion={region}
      >
        <Marker
coordinate={region}
        />
      </MapView>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <SearchBar />
        </View>
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
  });

export default Map;
