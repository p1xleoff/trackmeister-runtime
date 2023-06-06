import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native"; 
import {
    List,
    useTheme
  } from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import themeContext from "../config/themeContext";
import theme from "../config/theme";
  
function Favorites() {
    const navigation = useNavigation();
    const toDemap = () => {
      navigation.navigate("Demap");
    }; 
      const theme = useContext(themeContext);
      const styles = getStyles(theme); 
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

const getStyles = (theme) =>
StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: '5%',
        color: theme.color,
    },
    textContainer: {
        borderWidth: 1,
        borderRadius: 9,
        height: 100,
    },
    item: {
        backgroundColor: theme.highlight,
        borderWidth: 0,
        borderRadius: 9,
        margin: 5,
        elevation: 1,
    },
    itemText: {
        fontSize: 22,
        fontWeight: "400",
        color: theme.color,
    },
    icon: {
        fontSize: 30,
        marginLeft: 15,
        color: theme.color,
    }
})

export default Favorites; 