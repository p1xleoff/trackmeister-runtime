import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';


async function getLocationAsync() {
    // ask for permission
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
  
    if (status !== 'granted') {
      // permission denied
      console.log('Permission to access location was denied');
      return;
    }
  
    // get current location
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;
    console.log(`Current location: ${latitude}, ${longitude}`);
  }

export default getLocationAsync;