import React from 'react';
import { StyleSheet, View, Pressable, Text, StatusBar, Dimensions} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Searchbar } from 'react-native-paper';
import { Appbar } from 'react-native-paper';

//import theme from '../config/theme';
import HeaderUlt from '../components/HeaderUlt';
//import BottomNavBar from '../components/BottomTry';


const Home = () => {
  
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  

return (
  <View style={styles.container}>
    <HeaderUlt />
      <View>
        <Text style={styles.topText}>Nearby Stops</Text>
        <View style={styles.textContainer}>
      <View>
        <Text style={styles.text}>Your nearby stops appear here</Text>
      </View>
    </View>
      </View>
      <View>
        <Text style={styles.topText}>Pinned Stops</Text>
        <View style={styles.textContainer}>
      <View>
        <Text style={styles.text}>Your pinned stops appear here</Text>
      </View>
    </View>
      </View>
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
  },
  topText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15, 
  },
  textContainer: {
    borderWidth: 1,
    borderRadius: 9,
    height: 100,
},
  text: {
    fontSize: 16,
    margin: 10,
},
})

export default Home;