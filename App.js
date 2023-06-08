import React, { useState, useEffect } from 'react';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { NavigationStack } from './app/config/NavigationStack';

import { EventRegister } from 'react-native-event-listeners';

import themeContext from './app/config/themeContext';
import theme from './app/config/theme';
import { DefaultTheme } from 'react-native-paper';

export default function App() {

  const [ mode, setMode ] = useState(false);
  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme", 
      (data) =>  {
        setMode(data);
      }
    );
    return () => {
      EventRegister.removeAllListeners(eventListener);
    }
  })

  return (
    <themeContext.Provider value = {mode === true ? theme.dark : theme.light }>
    <NavigationContainer theme = { mode === true ? DarkTheme : DefaultTheme }>
      <NavigationStack />
    </NavigationContainer>
    </themeContext.Provider>
  );
};


