import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Settings() {
    return ( 
    <View style={styles.container}>
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
    }
})
export default Settings;