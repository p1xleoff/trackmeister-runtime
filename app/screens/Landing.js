import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

import themeContext from "../config/themeContext";

import Home from './Home';
import Map from './Map';
import Route from './Route';
import Account from './Account';
import { Easing } from 'react-native';

const HomeRoute = () => <Home />;
const MapRoute = () => <Map />;
const RouteRoute = () => <Route />;
const AccountRoute = () => <Account />;


const BottomNavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'map', title: 'Map', focusedIcon: 'map', unfocusedIcon: 'map-outline' },
    { key: 'route', title: 'Routes', focusedIcon: 'transit-detour', unfocusedIcon: 'transit-detour'},
    { key: 'account', title: 'Account', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    map: MapRoute,
    route: RouteRoute,
    account: AccountRoute,
  });

  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.bottomNavBar}
      sceneAnimationEnabled = {true}
      sceneAnimationType = {'shifting'}
      theme={theme}      
      activeColor='red'
      inactiveColor='#525252'
    />
  );
}

const getStyles = (theme) =>
StyleSheet.create({
  bottomNavBar: {
    marginBottom: -9,
    backgroundColor: theme.barColor,
  },
});


export default BottomNavBar;