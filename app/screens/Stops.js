import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  DefaultTheme,
  Divider,
  List,
  Provider as PaperProvider,
} from "react-native-paper";
import { PagerView } from "react-native-pager-view";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import theme from "../config/theme";

const ListTab = () => (
  <ScrollView>
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bus Stops</Text>
      </View>
      <View style={styles.item}>
          <List.Item  
            title="KTC Bus Stand"
            description="Panaji"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Old Bus Stand"
            description="Ponda"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Margao Bus Stand"
            description="Margao"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Vasco Bus Stand"
            description="Vasco"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Marcela Bus Stand"
            description="Marcel"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Mapusa Bus Stand"
            description="Mapusa"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Sanquelim Bus Stand"
            description="Sanquelim"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Bicholim Bus Stand"
            description="Bicholim"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Assonora Bus Stand"
            description="Assonora"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Cuncolin Bus Stand"
            description="Cuncolin"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Canacona Bus Stand"
            description="Canacona"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-stop" />
            )}
          />
        </View>
</View>
  </ScrollView>
);

const MapTab = () => (
  <View style={styles.mapContainer}>
  <MapView
    style={styles.map}
    initialRegion={{
      latitude: 15.4225,
      longitude: 73.9802,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    <Marker
      coordinate={{
        latitude: 15.4225,
        longitude: 73.9802,
      }}
      title="Marker title"
      description="Marker description"
    />
  </MapView>
</View>
);

const initialLayout = { width: Dimensions.get("window").width };

export default function Stops() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "list", title: "List"},
    { key: "map", title: "Map" },
  ]);

  const renderScene = SceneMap({
    list: ListTab,
    map: MapTab,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
    />
    
  );

  return (
    <PaperProvider theme={DefaultTheme}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        renderPager={(props) => <PagerView {...props} />}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#fff",
  },
  indicator: {
    backgroundColor: 'gold',
  },
  label: {
    color: "#000",
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
  },
  ticket: {
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 9,
    marginVertical: 10,
  },
  qr: {
    alignItems: "center",
  },  
  map: {
    flex: 1,
  },
  mapContainer: {
    flex: 1
  },
  item: {
    fontSize: 50,
    fontWeight: "bold",
    margin: 5,
},
  itemText: {
    fontSize: 22,
    fontWeight: "400",
},
  icon: {
    fontSize: 24,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
},
title: {
  fontSize: 22,
  fontWeight: 'bold',
  margin: 15,
},
titleContainer:  {
  alignContent: 'center',
  justifyContent: 'center'
}
});