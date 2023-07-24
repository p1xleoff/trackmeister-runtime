import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import themeContext from "../config/themeContext";
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BusStops() {
  const db = getDatabase();
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [data, setData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

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

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.log('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        const jsonFavorites = JSON.stringify(favorites);
        await AsyncStorage.setItem('favorites', jsonFavorites);
      } catch (error) {
        console.log('Error saving favorites:', error);
      }
    };

    saveFavorites();
  }, [favorites]);

  const toggleFavorite = (stopId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(stopId)) {
        return prevFavorites.filter((id) => id !== stopId); // Remove from favorites
      } else {
        return [...prevFavorites, stopId]; // Add to favorites
      }
    });
  };

  const BusStopItem = ({ stopId, stopName, address }) => {
    const isFavorite = favorites.includes(stopId);

    return (
      <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{stopName}</Text>
          <Text style={styles.text}>{address}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(stopId)}>
          <Icon
            name={isFavorite ? 'star' : 'star-o'}
            size={20}
            color={theme.accent}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <BusStopItem
        stopId={item.stopId}
        stopName={item.stopName}
        address={item.address}
      />
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
          keyExtractor={(item) => item.stopId.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    title: {
      fontWeight: 'bold',
      color: theme.color,
    },
    list: {
      marginHorizontal: '5%',
      color: theme.color,
    },
    headerContainer: {
      justifyContent: 'center',
      marginBottom: 10,
      marginHorizontal: '5%',
    },
    header: {
      fontWeight: 'bold',
      fontSize: 18,
      color: theme.accent,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme.subtext,
    },
    icon: {
      marginLeft: 10,
    },
  });
