import React, { useContext } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';

import themeContext from "../config/themeContext";

const SearchBar = () => {
  
    const theme = useContext(themeContext);
    const styles = getStyles(theme);
    const navigation = useNavigation();

    const statusBarStyle = theme.theme === 'dark' ? 'light-content' : 'dark-content';
    const statusBarBackgroundColor = theme.theme === 'dark' ? theme.background : theme.background;

    const toSearch = () => {
      navigation.navigate('Search');
    };
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={statusBarBackgroundColor} barStyle={statusBarStyle}/>
        <Searchbar 
          style={styles.searchBar} 
          placeholder="Search for stops"
          placeholderTextColor={theme.color}
          iconColor={theme.color}
          onPressIn={toSearch}
          /> 
      </View>
    );
  };
  
  const getStyles = (theme) => 
  StyleSheet.create({
    container: {
      flexDirection: 'row',  
      alignItems: 'center',
      marginHorizontal: '5%',
      marginBottom: '5%',
      borderRadius: 30,
      elevation: 5,
      top: 10
    },
    searchBar: {
      flex: 1,
      borderRadius: 30,   
      backgroundColor: theme.barColor,
    },  
    searchInput: {
      fontSize: 16,
      color: 'red',
    },
  })

  export default SearchBar;
