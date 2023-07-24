import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import themeContext from "../config/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const MapScreen = ({ route }) => {
  const { busLocation, regNo } = route.params ?? {};
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [mapRegion, setMapRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const toBusFleet = () => {
    navigation.navigate("BusFleet");
  };

  useEffect(() => {
    if (busLocation) {
      setMapRegion({
        latitude: busLocation.latitude,
        longitude: busLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [busLocation]);

  const refreshBusLocation = async () => {
    setIsLoading(true);
    try {
      const formattedRegNo = regNo.replace(/ /g, '');
      const timestamp = new Date().getTime();
      const url = `http://65.1.176.163:3000/api?timestamp=${timestamp}`;

      const payload = {
        VehicleRegNo: formattedRegNo
      };
      console.log('API Request Payload:', payload);

      const response = await axios.post(url, payload);
      console.log('API Response:', response.data);

      if (response.data.VehicleDetail.length > 0) {
        const vehicle = response.data.VehicleDetail[0];
        const updatedBusLocation = {
          latitude: vehicle.Latitude,
          longitude: vehicle.Longitude
        };
        console.log('Updated Bus Location:', updatedBusLocation);
        setMapRegion(prevRegion => ({
          ...prevRegion,
          latitude: updatedBusLocation.latitude,
          longitude: updatedBusLocation.longitude,
        }));
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {mapRegion && (
        <MapView style={styles.map} region={mapRegion}>
          {busLocation && (
            <Marker
              title={regNo}
              coordinate={{
                latitude: busLocation.latitude,
                longitude: busLocation.longitude,
              }}
            >
              <Image source={require('../assets/bus-icon.png')} style={{ width: 55, height: 55 }} />
            </Marker>
          )}
        </MapView>
      )}
      {!mapRegion && <ActivityIndicator style={styles.loader} size="large" color={theme.accent} />}
      <TouchableOpacity style={styles.refreshButton} onPress={refreshBusLocation} disabled={isLoading}>
      <MaterialCommunityIcons style={styles.icon} name="refresh" />
        {isLoading ? (
          <ActivityIndicator size="small" color={theme.color} />
        ) : (
          <Text style={styles.refreshText}>{regNo}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={toBusFleet}> 
        <MaterialCommunityIcons name="chevron-left" size={35} color={theme.background} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    refreshButton: {
      position: 'absolute',
      bottom: 25,
      backgroundColor: theme.accent,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      elevation: 10,
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    refreshText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    },
    icon: {
      color: '#fff',
      marginRight: 5,
      fontSize: 18
    },
    backButton: {
      position: 'absolute',
      backgroundColor: theme.option,
      borderRadius: 2000,
      left: 15,
      top: 10,
      elevation: 5
    }
  });

export default MapScreen;
