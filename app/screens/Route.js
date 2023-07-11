import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import themeContext from "../config/themeContext";

function Route() {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);

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

const getStyles = (theme) => 
  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        color: theme.color,
    },
    topText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
        color: theme.color,
        marginHorizontal: '5%',
    },
    textContainer: {
        height: 100,   
        marginHorizontal: '5%',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        margin: 10,
        color: theme.color,
    },
})

export default Route; 