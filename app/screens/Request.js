import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const BusDetailsScreen = () => {
  const [responseData, setResponseData] = useState([]);

  const makeApiRequest = async () => {
    try {
      const timestamp = new Date().getTime();
      const url = `http://65.1.176.163:3000/api?timestamp=${timestamp}`;

      const vehicleNumbers = ['GA08V4965', 'GA0B4966', 'GA08V4967', 'GA08V4968', 'GA08V4972', 'GA08V4973', 'GA08V4974',
                              'GA08V4975', 'GA08V4976', 'GA08V4977', 'GA08V4978', 'GA08V4979', 'GA08V4980', 'GA08V4981',
                              'GA08V4982', 'GA08V4983', 'GA08V4984', 'GA08V4985', 'GA08V4986', 'GA08V4987'];

      const fetchedData = [];

      for (const vehicleNumber of vehicleNumbers) {
        const payload = {
          VehicleRegNo: vehicleNumber
        };

        const response = await axios.post(url, payload);
        // console.log(response.data);

        if (response.data.VehicleDetail.length > 0) {
          const vehicle = response.data.VehicleDetail[0];
          if (vehicle.EngineStatus === 'On') {
            fetchedData.push(vehicle);
          }
        }
      }

      //console.log(fetchedData);
      setResponseData(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 15.4064, // Set the initial region's latitude
          longitude: 73.9971, // Set the initial region's longitude
          latitudeDelta: 0.0922, // Set the latitude delta
          longitudeDelta: 0.0421, // Set the longitude delta
        }}
      >
        {responseData.map((bus, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: bus.Latitude, // Use the bus's latitude
              longitude: bus.Longitude, // Use the bus's longitude
            }}
          >
            <Image
              source={require('../assets/bus-icon.png')} // Replace with your custom marker image
              style={{ width: 55, height: 55 }} // Set the size of the marker image
            />
          </Marker>
        ))}
      </MapView>
      <Button title="Fetch Data" onPress={makeApiRequest} />
    </View>
  );
};

export default BusDetailsScreen;
