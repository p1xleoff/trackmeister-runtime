import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  DefaultTheme,
  Divider,
  Provider as PaperProvider,
} from "react-native-paper";
import { PagerView } from "react-native-pager-view";

//import theme from "../config/theme";

const Current = () => (
  <ScrollView>
    <View style={styles.container}>
    <Text style={styles.text}>You have no trips planned</Text>
    </View>
  </ScrollView>
);

const History = () => (
  <ScrollView>
    <Text></Text>
  </ScrollView>
);

const initialLayout = { width: Dimensions.get("window").width };

export default function TripPlanner() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "current", title: "Current" },
    { key: "history", title: "History" },
  ]);

  const renderScene = SceneMap({
    current: Current,
    history: History,
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
  container: {
    flex: 1,
    fontSize: 25,
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',  
  },
  text: {
    fontSize: 18,
  },
});
