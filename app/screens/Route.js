import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { GMAPS_KEY } from '@env';
import themeContext from "../config/themeContext";
import { useNavigation } from '@react-navigation/native';

const Route = () => {
  const [presetRoutes, setPresetRoutes] = useState([]);
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const navigation = useNavigation(); 

  useEffect(() => {
    // Fetch preset routes from your database
    const db = getDatabase();
    const routesRef = ref(db, 'routes');

    const handleData = (snapshot) => {
      const routesData = snapshot.val();
      if (routesData) {
        const routesArray = Object.values(routesData);
        setPresetRoutes(routesArray);
      }
    };

    onValue(routesRef, handleData);

    return () => {
      off(routesRef, 'value', handleData);
    };
  }, []);

  const handleRoutePress = (route) => {
    navigation.navigate('Demap', { selectedRoute: route });
  };

  const RouteItem = ({ route }) => {
    return (
      <View style={styles.routeItem}>
        <Text style={styles.routeName}>{route.routeName}</Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Render the list of routes */}
      {presetRoutes.map((route) => (
        <TouchableOpacity key={route.routeId} onPress={() => handleRoutePress(route)}>
          <RouteItem route={route} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.background,
  },
  routeItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.highlight,
    borderRadius: 10,
    padding: 10,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.color,
  },
});

export default Route;