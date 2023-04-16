import React, { useContext } from 'react';
import { StyleSheet, View, Pressable, Text, StatusBar, Dimensions} from 'react-native';

import { Searchbar } from 'react-native-paper';

import themeContext from "../config/themeContext";

const SearchBar = () => {
  
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const theme = useContext(themeContext);
    const styles = getStyles(theme);
  
    return (
      <View style={styles.container}>
        <Searchbar 
          style={styles.searchBar} 
          placeholder="Search for stops"
          inputStyle={styles.searchInput} /> 
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
      marginTop: StatusBar.currentHeight + 10,
      borderRadius: 30,
      elevation: 5,
    },
    searchBar: {
      flex: 1,
      borderRadius: 30,
      color: theme.color,
      backgroundColor: theme.barColor,
    },  
    searchInput: {
      fontSize: 16,
      color: 'red',
    },
  })

  export default SearchBar;
