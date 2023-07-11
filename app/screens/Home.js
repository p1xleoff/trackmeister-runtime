import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import SearchBar from '../components/SearchBar';
import themeContext from "../config/themeContext";
import * as Location from 'expo-location';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { LocationProvider } from '../config/LocationProvider';

function Home () {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [nearestStops, setNearestStops] = useState([]);
  const [visibleStops, setVisibleStops] = useState(2);
  const [showMore, setShowMore] = useState(true);

  const navigation = useNavigation();
  
  const toBusStops = () => {
    navigation.navigate("Stops");
  };  
  
  const toTester = () => {
    navigation.navigate("Tester")
  };  
  const toProfile = () => {
    navigation.navigate("Profile")
  };
  const toRequest = () => {
    navigation.navigate("Request")
  };

  useEffect(() => {
    getLocationPermissionAndFetchData();
  }, []);

  const getLocationPermissionAndFetchData = async () => {
    const granted = await LocationProvider();
    if (granted) {
      getUserLocation();
    }
  };

  const getUserLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();

      const stops = await fetchNearestStops(coords.latitude, coords.longitude);
      setNearestStops(stops);
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  };
  
  const fetchNearestStops = async (latitude, longitude) => {
    try {
      const db = getDatabase();
      const dbRef = ref(db, 'busStops');
      const snapshot = await new Promise((resolve, reject) => {
        onValue(dbRef, resolve, reject);
      });

      if (snapshot.exists()) {
        const stops = snapshot.val();

        if (!stops) {
          console.log('No stops found');
          return [];
        }

        const stopsWithDistance = Object.values(stops).map(stop => {
          const { latitude: stopLatitude, longitude: stopLongitude, ...otherProps } = stop;

          // Calculate the distance using the Haversine formula
          const distance = calculateDistance(latitude, longitude, stopLatitude, stopLongitude);

          return {
            latitude: stopLatitude,
            longitude: stopLongitude,
            distance,
            ...otherProps
          };
        });

        // Sort the stops based on distance in ascending order
        const sortedStops = stopsWithDistance.sort((a, b) => a.distance - b.distance);

        return sortedStops;
      } else {
        console.log('No stops found');
        return [];
      }
    } catch (error) {
      console.error('Error fetching nearest stops:', error);
      return [];
    }
  };

  const calculateDistance = (userLatitude, userLongitude, stopLatitude, stopLongitude) => {
    const toRadians = (value) => (value * Math.PI) / 180; // Helper function to convert degrees to radians

    const earthRadius = 6371; // Radius of the Earth in kilometers

    const phi1 = toRadians(userLatitude);
    const phi2 = toRadians(stopLatitude);
    const deltaPhi = toRadians(stopLatitude - userLatitude);
    const deltaLambda = toRadians(stopLongitude - userLongitude);

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    // Convert distance to meters and round to two decimal places
    return Math.round(distance * 10) / 10;
  };

  const renderStopItem = ({ item }) => (
    <TouchableOpacity style={styles.textContainer}>
      <Text style={[styles.itemName, styles.text]}>{item.stopName}</Text>
      <Text style={[styles.itemAddress, styles.text]}>{item.address}</Text>
      <Text style={[styles.itemDistance, styles.text]}>{item.distance} km away</Text>
    </TouchableOpacity>
  );

  const handleShowMore = () => {
    setVisibleStops(visibleStops + 2);
  };

  const handleCollapse = () => {
    setVisibleStops(2);
  };

  useEffect(() => {
    if (nearestStops.length <= 5) {
      setShowMore(false);
    } else {
      setShowMore(visibleStops < nearestStops.length);
    }
  }, [nearestStops, visibleStops]);

  const handleRefresh = () => {
    getUserLocation();
    setVisibleStops(1);
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={styles.topText}>Nearby Stops</Text>
        <TouchableOpacity onPress={toBusStops}>
          <Text style={[styles.floatButton, styles.buttonText]}>See all</Text>
          </TouchableOpacity>
        </View>  
      <View style={styles.listContainer}>
        {nearestStops.length > 0 ? (
          <>
            <FlatList
              data={nearestStops.slice(0, visibleStops)}
              renderItem={renderStopItem}
              keyExtractor={(item) => item.stopId.toString()}
              contentContainerStyle={styles.listContent}
              initialNumToRender={2}
            />
            {showMore ? (
              visibleStops >= 5 ? (
                <View>
                <TouchableOpacity style={styles.listLeftButton} onPress={handleCollapse}>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Collapse</Text>
                  <MaterialCommunityIcons name="chevron-up" size={24} color="black" style={styles.icon} />
                  </View>
              </TouchableOpacity>
              </View>
              ) : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.listLeftButton} onPress={handleShowMore}>
                  <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Show More</Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="black" style={styles.icon} />
                  </View>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                  <View style={styles.buttonContent}>
                  <MaterialCommunityIcons name="refresh" size={24} color="black" style={styles.icon} />
                    <Text style={styles.buttonText}>Refresh</Text>
                  </View>
                </TouchableOpacity>
              </View>
              )
            ) : null}
          </>
        ) : (
          <Text style={styles.text}>Loading nearest stops...</Text>
        )}
      </View>
      <View style={{marginHorizontal: '5%'}}>
        <TouchableOpacity onPress={toTester}
          style={{padding: 10, borderRadius: 9, backgroundColor: theme.accent, 
              justifyContent: 'center', alignItems: 'center',
              elevation: 9, marginBottom: 10 }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Track Bus</Text>
        </TouchableOpacity>        
        <TouchableOpacity onPress={toRequest}
          style={{padding: 10, borderRadius: 9, backgroundColor: theme.accent, 
              justifyContent: 'center', alignItems: 'center',
              elevation: 9, marginBottom: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      color: theme.color,
    },
    topText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      color: theme.accent,
      marginHorizontal: '5%',
    },
    text: {
      color: theme.color,
    },
    listContainer: {
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 20,
      marginHorizontal: '5%',
      backgroundColor: theme.background,
    },
    itemName: {
      fontSize: 16,
      marginTop: 10,
      fontWeight: 'bold',
    },
    itemAddress: {
      fontSize: 14,
    },
    itemDistance: {
      fontSize: 12,
      marginTop: 2,
      fontWeight: '600',
    },
    textContainer: {
      borderWidth: 1,
      paddingBottom: 10,
      marginBottom: 10,
      flex: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      borderColor: theme.highlight,
      borderRadius: 10,
    },
    floatButton:  {
      fontWeight: 'bold',
      marginTop: 10,
      color: theme.color,
      marginHorizontal: '5%', 
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingHorizontal: '5%',
    },
    listLeftButton: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    refreshButton: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: theme.option,
      fontWeight: 'bold',
    },
    separator: {
      width: 1,
      height: '100%',
      backgroundColor: theme.color,
    },
    buttonContent:  {
      flexDirection: 'row', 
      alignItems: 'center',
    },
    icon: {
      marginHorizontal: 5,
      color: theme.option,
    }
  });

export default Home;
