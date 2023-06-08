import React, { useState, useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { NavigationStack } from './app/config/NavigationStack';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './app/config/themeContext';
import theme from './app/config/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    // Check for stored theme mode on app initialization
    const retrieveStoredMode = async () => {
      try {
        const storedMode = await AsyncStorage.getItem('themeMode');
        if (storedMode !== null) {
          setMode(JSON.parse(storedMode));
        }
      } catch (error) {
        console.error('Error retrieving theme mode from storage:', error);
      }
    };

    retrieveStoredMode();

    // Listen for theme change events
    const eventListener = EventRegister.addEventListener('changeTheme', async (data) => {
      setMode(data);
      // Store the updated theme mode
      try {
        await AsyncStorage.setItem('themeMode', JSON.stringify(data));
      } catch (error) {
        console.error('Error storing theme mode in storage:', error);
      }
    });

    return () => {
      EventRegister.removeAllListeners(eventListener);
    };
  }, []);

  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
        <NavigationStack />
      </NavigationContainer>
    </themeContext.Provider>
  );
}
