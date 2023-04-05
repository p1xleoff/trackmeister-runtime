import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { usefonts } from 'expo-font';

import Home from './Home';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import Map from './Map';
import Route from './Route';
import Account from './Account';

const HomeRoute = () => <Home />;
const MapRoute = () => <Map />;
const RouteRoute = () => <Route />;
const AccountRoute = () => <Account />;


const BottomNavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home'},
    { key: 'map', title: 'Map', focusedIcon: 'map', unfocusedIcon: 'map' },
    { key: 'route', title: 'Routes', focusedIcon: 'transit-detour', unfocusedIcon: 'transit-detour'},
    { key: 'account', title: 'Account', focusedIcon: 'account', unfocusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    map: MapRoute,
    route: RouteRoute,
    account: AccountRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.bottomNavBar}
      shifting={false}
    />
  );
}

const styles = StyleSheet.create({
  bottomNavBar: {
    backgroundColor: '#e8e8e8',
    marginBottom: -10,
  },
});


export default BottomNavBar;