import React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

import HeaderUlt from '../components/HeaderUlt';

function Route() {
    return ( 
    <View style={styles.container}>
    <HeaderUlt />
      <Text style={styles.topText}>My Routes</Text>
    <View style={styles.textContainer}>
      <View>
        <Text style={styles.text}>Your created routes appear here</Text>
      </View>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: '5%',
    },
    topText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    textContainer: {
        borderWidth: 1,
        borderRadius: 9,
        height: 100,
    },
    text: {
        fontSize: 16,
        margin: 10,
    },
})

export default Route; 