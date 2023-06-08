import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { checkAuthState } from '../data/firebaseConfig'
import themeContext from "./themeContext";

export default function Tester() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  useEffect(() => {
    // Set up the authentication state change listener
    checkAuthState(
      (user) => {
        // User is authenticated, handle the logged-in state
        console.log('User Authenticated');
        navigation.replace("Landing");
        // You can set the user state or dispatch an action here
      },
      () => {
        // User is logged out, handle the logged-out state
        console.log('No Login Detected');
        navigation.replace("Login")
        // You can clear the user state or dispatch an action here
      }
    );
  }, []);
  return (
    <View style={styles.container}>
     <ActivityIndicator style={styles.loader}  color={theme.accent}/>
    </View>
  )
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: theme.background
    },
    loader: {
      transform: [{ scale: 2 }]
    },
  });