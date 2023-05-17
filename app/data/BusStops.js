import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import themeContext from "../config/themeContext";
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, off } from 'firebase/database';

export default function BusStops() {
  const db = getDatabase();
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [data, setData] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const toLanding = () => {
    navigation.navigate('Landing');
  };

  useEffect(() => {
    setIsMounted(true);

    const starCountRef = ref(db, 'busStops');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
      setIsLoading(false);
    });

    return () => {
      setIsMounted(false);
      off(starCountRef);
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>{item.stopName}</Text>
        <Text style={styles.text}>{item.address}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Bus Stops</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color={theme.accent} />
      ) : (
        <FlatList
          style={styles.list}
          data={Object.values(data)}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      top: StatusBar.currentHeight + 20,
      backgroundColor: theme.background,
    },
    title: {
      fontWeight: 'bold',
      color: theme.color
    },
    list: {
      marginHorizontal: '5%',
      color: theme.color
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },
    header: {
      fontWeight: 'bold',
      fontSize: 18,
      color: theme.accent
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme.subtext
    }
  });
