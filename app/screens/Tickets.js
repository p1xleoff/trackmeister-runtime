import React, { useEffect, useState, useContext } from 'react';
import { View, useWindowDimensions, StyleSheet, Text, TouchableOpacity, Divider, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import themeContext from "../config/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ActiveTickets = () => {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.container} >
      <View style={{marginTop: 10, alignItems: 'center'}} >
        <Text style={styles.text} >No active tickets</Text>
      </View>
    </View>
  );
};

const ExpiredTickets = () => {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.ticket}>
        <View>
          <Text style={styles.title}>Single Journey Ticket</Text>
          <Text style={styles.text}>GA - 03 - X - 1337</Text>
          <Text style={styles.text}>Old Bus Stand - Ponda</Text>
          <Text style={styles.text}>KTC Bus Stand - Panaji</Text>
          <Text style={styles.text}>1 Adult</Text>
          <Text style={styles.text}>₹30 Total Fair Paid</Text>
        </View>
        <View style={styles.dividerContainer}>
          {/* Use a custom view for the divider */}
          <View style={styles.divider} />
        </View>
        <View style={styles.qr}>
          <Text style={styles.qrDate}>27 March 2023, 03:33:33 PM</Text>
          <Image source={require("../assets/qr.png")} />
        </View>
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  active: ActiveTickets,
  expired: ExpiredTickets,
});

export default function Tickets() {
  const layout = useWindowDimensions();

  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  const navigation = useNavigation();
  const toStopSelect = () => {
    navigation.navigate("StopSelect")
  }; 

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'active', title: 'Active' },
    { key: 'expired', title: 'Expired' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );
  
  return (
    <View style={styles.container}>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
      <TouchableOpacity style={styles.refreshButton} onPress={toStopSelect}>
        <Text style={styles.buttonText}>Buy Ticket</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    tabBar: {
      backgroundColor: theme.highlight,
    },
    tabLabel: {
      color: theme.color,
    },
    tabIndicator: {
      backgroundColor: theme.accent,
    },
    text: {
      color: theme.color,
    },
    refreshButton: {
      position: 'absolute',
      bottom: 25,
      right: 20,
      backgroundColor: theme.accent,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      elevation: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
    },
    icon: {
      fontSize: 24,
      color: "#fff",
      paddingRight: 5,
    },
    ticket: {
      borderColor: "gray",
      borderWidth: 1,
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 9,
      marginVertical: 10,
      color: theme.color,
      backgroundColor: theme.background,
    },
    qr: {
      alignItems: "center",
      color: theme.color,
    },
    qrDate: {
    marginBottom: 10,
    color: theme.color,
    }
  });
