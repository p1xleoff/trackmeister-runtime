import React from 'react';
import { StyleSheet, View, Pressable, Text, StatusBar, Dimensions} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Searchbar, Appbar } from 'react-native-paper';

//import theme from '../config/theme';

const HeaderUlt = () => {
  
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
  
    return (
      <Appbar.Header transparent style={styles.container}>
        <Searchbar style={styles.searchBar} placeholder="Search for stops, services" /> 
      </Appbar.Header>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',  
      alignItems: 'center',
      },
    searchBar: {
      flex: 1,
      backgroundColor: '#c4c4c4',
      borderRadius: 100,
    },  
    profileIcon: {
      borderWidth: 1,
      borderColor: 'gold',
      backgroundColor: 'white',
    },
  })

  export default HeaderUlt;