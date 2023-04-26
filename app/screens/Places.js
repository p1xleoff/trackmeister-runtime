import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Places = () => {
  return (
    <View 
    style={{
        flex: 1,
        padding: 10,
        height: "100%",

    }}>
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'GOOGLE_API_KEY',
        language: 'en',
      }}
    />
    </View>
  );
};

export default Places;
