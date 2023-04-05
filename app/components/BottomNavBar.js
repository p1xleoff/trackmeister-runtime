import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';

const BottomNav = () => {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'search', title: 'Search', icon: 'search' },
    { key: 'settings', title: 'Settings', icon: 'settings' },
  ];

  const renderScene = BottomNav.SceneMap({
    home: () => <Text>Home Screen</Text>,
    search: () => <Text>Search Screen</Text>,
    settings: () => <Text>Settings Screen</Text>,
  });

  const renderIcon = ({ route, color }) => (
    <MaterialIcons name={route.icon} color={color} size={26} />
  );

  return (
    <BottomNav
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
      barStyle={{ backgroundColor: '#ffffff' }}
      activeColor='#ff0000'
      inactiveColor='#000000'
    />
  );
};


export default BottomNav;