import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import themeContext from "../config/themeContext";
import BusStops from '../data/BusStops'
import StopMap from '../config/StopMap'

const initialLayout = { width: Dimensions.get('window').width };

function Stops () {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'list', title: 'List' },
    { key: 'map', title: 'Map' },
  ]);

  const renderScene = SceneMap({
    list: BusStops,
    map: StopMap,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const getStyles = (theme) => 
StyleSheet.create({
  container:  {
    flex: 1,
    backgroundColor: theme.background
  },
  tabBar: {
    backgroundColor: theme.background,
    marginBottom: -30
  },
  indicator: {
    backgroundColor: theme.accent,
  },
  label: {
    color: theme.color,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Stops;
