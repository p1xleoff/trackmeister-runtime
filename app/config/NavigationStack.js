import React from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, DarkTheme as PaperDarkTheme, Provider as PaperProvider } from 'react-native-paper';

import Landing from '../screens/Landing';
import Test from '../screens/Test';
import Settings from '../screens/Settings';
import Search from '../screens/Search';
import Tickets from '../screens/Tickets';
import Stops from '../screens/Stops';
import Demap from './Demap';
import Favorites from '../screens/Favorites';
import TripPlanner from '../screens/TripPlanner';
import Welcome from '../screens/Welcome';
import Map from '../screens/Map';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Tester from '../components/Tester';

const Stack = createStackNavigator();

export const NavigationStack = () => {
  return (
    <PaperProvider>
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={Landing} options={{ header: () => null }} />
      <Stack.Screen name="Test" component={Test} options={{ header: () => null }} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Search" component={Search} options={{ header: () => null }} />
      <Stack.Screen name="Tickets" component={Tickets} />
      <Stack.Screen name="Stops" component={Stops} />
      <Stack.Screen name="Demap" component={Demap} options={{ headerTitle: 'Set Marker' }} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="TripPlanner" component={TripPlanner} options={{ headerTitle: 'Trip Planner' }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ header: () => null }} />
      <Stack.Screen name="Map" component={Map} options={{ header: () => null }} />
      <Stack.Screen name="Home" component={Home} options={{ header: () => null }} />
      <Stack.Screen name="Register" component={Register} options={{ header: () => null }} />
      <Stack.Screen name="Login" component={Login} options={{ header: () => null }} />
      <Stack.Screen name="Tester" component={Tester} options={{ header: () => null }} />
    </Stack.Navigator>
    </PaperProvider>
  );
};
