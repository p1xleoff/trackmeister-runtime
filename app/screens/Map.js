import React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import HeaderUlt from '../components/HeaderUlt';

function Map() {
    return (
      <View style={styles.container}>
        <HeaderUlt />
        <MapView
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
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },  
    map: {
        flex: 1,
    }
})

export default Map; 