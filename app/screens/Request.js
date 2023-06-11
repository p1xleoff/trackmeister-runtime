import React from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const Tester = () => {
  const makeApiRequest = async () => {
    try {
      const url = 'http://65.1.176.163:3000/api';
      const payload = {
        VehicleRegNo: 'GA08V5699'
      };

      const response = await axios.post(url, payload);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Tester</Text>
      <Button onPress={makeApiRequest} title="Make API Request" />
    </View>
  );
};

export default Tester;
