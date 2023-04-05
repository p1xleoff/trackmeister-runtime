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
  Provider as PaperProvider,
} from "react-native-paper";
import { PagerView } from "react-native-pager-view";

//import theme from "../config/theme";

const ActiveRoute = () => (
  <ScrollView>
    <View>
      <View style={styles.ticket}>
        <View>
          <Text style={styles.title}>Single Journey Ticket</Text>
          <Text style={styles.text}>GA - 03 - X - 1337</Text>
          <Text style={styles.text}>Old Bus Stand - Ponda</Text>
          <Text style={styles.text}>KTC Bus Stand - Panaji</Text>
          <Text style={styles.text}>1 Adult</Text>
          <Text style={styles.text}>₹30 Total Fair Paid</Text>
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <View style={styles.qr}>
          <Text style={{ marginBottom: 10 }}>27 March 2023, 03:33:33 PM</Text>
          <Image source={require("../assets/qr.png")} />
        </View>
      </View>

      <View style={styles.ticket}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Single Journey Ticket
          </Text>
          <View>
            <Text style={styles.text}>GA - 03 - X - 1111</Text>
            <Text style={styles.text}>Old Bus Stand - Ponda</Text>
            <Text style={styles.text}>KTC Bus Stand - Panaji</Text>
            <Text style={styles.text}>2 Adults</Text>
            <Text style={styles.text}>₹60 Total Fair Paid</Text>
          </View>
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <View style={styles.qr}>
          <Text style={{ marginBottom: 10 }}>28 March 2023, 07:12:11 PM</Text>
          <Image source={require("../assets/qr.png")} />
        </View>
      </View>
    </View>
  </ScrollView>
);

const ExpiredRoute = () => (
  <ScrollView>
    <View>
      <View style={styles.ticket}>
        <View>
          <Text style={styles.title}>Single Journey Ticket</Text>
          <Text style={styles.text}>GA - 03 - X - 1337</Text>
          <Text style={styles.text}>Old Bus Stand - Ponda</Text>
          <Text style={styles.text}>KTC Bus Stand - Panaji</Text>
          <Text style={styles.text}>1 Adult</Text>
          <Text style={styles.text}>₹30 Total Fair Paid</Text>
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <View style={styles.qr}>
          <Text style={{ marginBottom: 10 }}>27 March 2023, 03:33:33 PM</Text>
          <Image source={require("../assets/qr.png")} />
        </View>
      </View>
    </View>
  </ScrollView>
);

const initialLayout = { width: Dimensions.get("window").width };

export default function Tickets() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "active", title: "Active" },
    { key: "expired", title: "Expired" },
  ]);

  const renderScene = SceneMap({
    active: ActiveRoute,
    expired: ExpiredRoute,
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
});
