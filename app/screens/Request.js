import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const Tester = () => {
  const [responseData, setResponseData] = useState(null);

  const makeApiRequest = async () => {
    try {
      const url = 'http://65.1.176.163:3000/api';
      const payload = {
        VehicleRegNo: 'GA08V4978'
      };

      const response = await axios.post(url, payload);
      console.log(response.data)
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: responseData?.VehicleDetail[0]?.Latitude || 0,
          longitude: responseData?.VehicleDetail[0]?.Longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {responseData && (
          <Marker
            coordinate={{
              latitude: responseData.VehicleDetail[0].Latitude,
              longitude: responseData.VehicleDetail[0].Longitude,
            }}
          />
        )}
      </MapView>

      <View style={{position: 'absolute', top: 20, left: 20}}>
        <Text>Tester</Text>
        <Button onPress={makeApiRequest} title="Make API Request" />
      </View>
    </View>
  );
};

export default Tester;
