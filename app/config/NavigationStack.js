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
import Home from '../screens/Home';
import Places from '../screens/Places';
import Profile from '../screens/Profile';
import Tester from '../screens/Tester';
import Search from '../components/Search';
import pxInit from '../config/pxInit'


const Stack = createStackNavigator();

export const NavigationStack = () => {
  return (
    <PaperProvider>
    <Stack.Navigator>
      <Stack.Screen name="pxInit" component={pxInit} options={{ header: () => null }}/>
      <Stack.Screen name="Landing" component={Landing} options={{ header: () => null }} />
      <Stack.Screen name="Login" component={Login} options={{ header: () => null }} />
      <Stack.Screen name="Search" component={Search} options={{ header: () => null }}/>
      <Stack.Screen name="Register" component={Register} options={{ header: () => null }} />
      <Stack.Screen name="Tickets" component={Tickets} />
      <Stack.Screen name="Stops" component={Stops} />
      <Stack.Screen name="Places" component={Places} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Demap" component={Demap} options={{ headerTitle: 'Set Marker' }} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="TripPlanner" component={TripPlanner} options={{ headerTitle: 'Trip Planner' }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ header: () => null }} />
      <Stack.Screen name="Map" component={Map} options={{ header: () => null }} />
      <Stack.Screen name="Tester" component={Tester} options={{ header: () => null }}/>
    </Stack.Navigator>
    </PaperProvider>
  );
};
