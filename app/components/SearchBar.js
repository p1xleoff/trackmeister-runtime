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
        <Searchbar style={styles.searchBar} placeholder="Search for stops" /> 
      </View>
    );
  };
  
  const getStyles = (theme) => 
  StyleSheet.create({
    container: {
      flexDirection: 'row',  
      alignItems: 'center',
      backgroundColor: theme.background,
      marginHorizontal: '5%',
      marginBottom: '5%',
      marginTop: StatusBar.currentHeight + 10,
      borderRadius: 9,
      elevation: 5,
    },
    searchBar: {
      flex: 1,
      backgroundColor: '#c4c4c4',
      borderRadius: 9,
    },  
  })

  export default SearchBar;
