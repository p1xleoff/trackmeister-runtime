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
import Route from '../screens/Route';
import Profile from '../screens/Profile';
import Tester from '../screens/Tester';
import Search from '../components/Search';
import pxInit from '../config/pxInit';
import BusMap from '../screens/BusMap';
import Language from '../screens/Language'
import Support from '../screens/Support';
import BusFleet from '../screens/BusFleet';
import LocationReqInfo from './LocationReqInfo'
import Purchase from '../screens/Purchase';
import StopSelect from '../screens/StopSelect';

const Stack = createStackNavigator();

export const NavigationStack = () => {
  return (
    <PaperProvider>
    <Stack.Navigator>
      <Stack.Screen name="pxInit" component={pxInit} options={{ header: () => null }}/>
      <Stack.Screen name="Landing" component={Landing} options={{ header: () => null }} />
      <Stack.Screen name="Login" component={Login} options={{ header: () => null }} />
      <Stack.Screen name="Map" component={Map} options={{ header: () => null }} />
      <Stack.Screen name="Tester" component={Tester} />
      <Stack.Screen name="Search" component={Search} options={{ header: () => null }}/>
      <Stack.Screen name="BusMap" component={BusMap} options={{ title: 'Bus Tracking', header: () => null }}/>
      <Stack.Screen name="Register" component={Register} options={{ header: () => null }} />
      <Stack.Screen name="Tickets" component={Tickets} />
      <Stack.Screen name="Stops" component={Stops} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Purchase" component={Purchase} options={{ headerTitle: 'Buy Ticket' }} />
      <Stack.Screen name="StopSelect" component={StopSelect} options={{ headerTitle: 'Select Stops' }} />
      <Stack.Screen name="Route" component={Route} options={{ title: 'Routes'}} />
      <Stack.Screen name="Demap" component={Demap} options={{ headerTitle: 'Set Marker' }} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="LocationReqInfo" component={LocationReqInfo} />
      <Stack.Screen name="BusFleet" component={BusFleet} options={{ title: 'Bus List' }}/>
      <Stack.Screen name="TripPlanner" component={TripPlanner} options={{ headerTitle: 'Trip Planner' }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ header: () => null }} />
    </Stack.Navigator>
    </PaperProvider>
  );
};
