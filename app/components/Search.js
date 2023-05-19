import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Searchbar } from 'react-native-paper';
import themeContext from "../config/themeContext";

const Search = () => {
  const [busStops, setBusStops] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const navigation = useNavigation();

  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  useEffect(() => {
    const db = getDatabase();
    const busStopsRef = ref(db, 'busStops');
    onValue(busStopsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const busStopsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBusStops(busStopsArray);
      }
      setLoading(false); // Set loading to false when data is loaded
    });

    return () => {
      off(busStopsRef);
    };
  }, []);

  const handleBusStopSelect = (busStop) => {
    navigation.navigate('Map', { busStop });
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const toLanding = () => {
    navigation.navigate('Landing');
  };

  const filteredBusStops = busStops.filter(
    (busStop) =>
      busStop.stopName.toLowerCase().includes(searchText.toLowerCase()) ||
      busStop.address.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderBusStopItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleBusStopSelect(item)} style={styles.busStopItem}>
      <Text style={styles.title}>{item.stopName}</Text>
      <Text style={styles.subText}>{item.address}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          style={styles.searchBar}
          onChangeText={handleSearchTextChange}
          value={searchText}
          placeholder="Search for stops"
          placeholderTextColor={theme.subtext}
          iconColor={theme.subtext}
          icon="arrow-left"
          onIconPress={toLanding}
        />
      </View>
      <FlatList data={filteredBusStops} keyExtractor={(item) => item.id} renderItem={renderBusStopItem} />
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    searchBar: {
      backgroundColor: theme.barColor,
    },
    searchContainer: {
      marginHorizontal: '5%',
      marginBottom: '5%',
      borderRadius: 30,
      elevation: 10,
      top: 10,
    },
    busStopItem: {
      marginHorizontal: '6%',
      paddingVertical: 16,
    },
    title: {
      color: theme.color,
      fontSize: 16,
      fontWeight: 'bold',
    },
    subText: {
      color: theme.subtext,
    },
  });

export default Search;
