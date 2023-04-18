import React from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider as PaperProvider } from 'react-native-paper';

import Landing from '../screens/Landing';
import Tickets from '../screens/Tickets';
import Stops from '../screens/Stops';
import Demap from './Demap';
import Favorites from '../screens/Favorites';
import TripPlanner from '../screens/TripPlanner';
import Welcome from '../screens/Welcome';
import Map from '../screens/Map';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Loading from '../screens/Loading';
import Home from '../screens/Home';

const Stack = createStackNavigator();

export const NavigationStack = () => {
  return (
    <PaperProvider>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ header: () => null }} />
      <Stack.Screen name="Register" component={Register} options={{ header: () => null }} />
      <Stack.Screen name="Landing" component={Landing} options={{ header: () => null }} />
      <Stack.Screen name="Tickets" component={Tickets} />
      <Stack.Screen name="Stops" component={Stops} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Demap" component={Demap} options={{ headerTitle: 'Set Marker' }} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="TripPlanner" component={TripPlanner} options={{ headerTitle: 'Trip Planner' }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ header: () => null }} />
      <Stack.Screen name="Map" component={Map} options={{ header: () => null }} />
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
    </PaperProvider>
  );
};
