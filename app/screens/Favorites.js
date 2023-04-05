import React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, View, Text } from "react-native"; 
import {
    Avatar,
    Divider,
    List,
    Modal,
    Portal,
    RadioButton,
    useTheme
  } from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { PreferencesContext } from "../config/PreferencesContext";
  
function Favorites() {
    const navigation = useNavigation();
    const toDemap = () => {
      navigation.navigate("Demap");
    }; 
    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext); 
    return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>
      <View style={styles.item}>
          <List.Item
            onPress={toDemap}
            title="Set Home"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="home" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            onPress={toDemap}
            title="Set Work"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="briefcase" />
            )}
          />
        </View>
</View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 15,
    },
    textContainer: {
        borderWidth: 1,
        borderRadius: 9,
        height: 100,
    },
    item: {
        fontSize: 50,
        fontWeight: "bold",
        backgroundColor: '#d6d6d6',
        borderWidth: 0,
        borderRadius: 9,
        margin: 5,
        elevation: 1
    },
    itemText: {
        fontSize: 22,
        fontWeight: "400",
    },
    icon: {
        fontSize: 24,
        marginLeft: 15,
    }
})

export default Favorites; 