import React, { useContext } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

import themeContext from "../config/themeContext";

function Route() {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);

    return ( 
    <View style={styles.container}>
    <TextInput
        style={styles.input}
        label="Input"
        placeholder="Enter Details"
      />
    <View>
        <Button title="Submit"> Get Details</Button>
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
        justifyContent: 'center',
    },
    topText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
        color: theme.color,
        marginHorizontal: '5%',
    },
    text: {
        fontSize: 16,
        margin: 10,
        color: theme.color,
    },
    input:  {
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10
    }
})

export default Route; 