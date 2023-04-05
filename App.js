import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider as PaperProvider } from 'react-native-paper';
import { DefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';

import { EventRegister } from 'react-native-event-listeners';

import { darkTheme, lightTheme } from './app/config/theme';
import Header from './app/components/Header';
import { PreferencesContext } from './app/config/PreferencesContext';

import Welcome from './app/screens/Welcome';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Home from './app/screens/Home';
import Landing from './app/screens/Landing';
import Map from './app/screens/Map';
import Tickets from './app/screens/Tickets';
import Stops from './app/screens/Stops';
import Favorites from './app/screens/Favorites';
import TripPlanner from './app/screens/TripPlanner';
import Test from './app/screens/Test';
import Settings from './app/screens/Settings';


import Demap from './app/config/Demap';
import Tester from './app/components/Tester';

const Stack = createStackNavigator();

export default function App() {
  
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? darkTheme : lightTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
    <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Landing" component={Landing} options={{ header: () => null }} />
            <Stack.Screen name="Test" component={Test} options={{ header: () => null }}/>
            <Stack.Screen name="Settings" component={Settings} />
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
        </NavigationContainer>
      </PaperProvider>
      </PreferencesContext.Provider>
  );
};


