import * as Location from 'expo-location';

export const LocationProvider = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // Display alert or navigate to location off screen
      // Example with Alert component
      Alert.alert(
        'Location Services Off',
        'Please enable location services to use this app.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ]
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};
