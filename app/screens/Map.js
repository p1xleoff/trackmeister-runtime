import React, { useContext } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import SearchBar from "../components/SearchBar";
import themeContext from "../config/themeContext";

function Map() {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const customMap = require('../config/pxMapStyle.json');
  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={customMap}
        style={styles.map}
        initialRegion={{
          latitude: 15.4225,
          longitude: 73.9802,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 15.4225,
            longitude: 73.9802,
          }}
          title="Marker title"
          description="Marker description"
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
    searchBar: {
      marginHorizontal: 16,
    },
  });

export default Map;
