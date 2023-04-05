import React from "react";
import { StyleSheet, View, Text, Pressable, StatusBar, TouchableNativeFeedback, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  Avatar,
  Divider,
  List,
  Modal,
  Portal,
  RadioButton,
  Button,
  Switch,
  useTheme
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import HeaderUlt from "../components/HeaderUlt";
import { PreferencesContext } from "../config/PreferencesContext";
import { lightTheme, darkTheme } from "../config/theme";

function Account() {
  //theme modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);  
  
  //about modal
  const [aboutVisible, setAboutVisible] = React.useState(false);
  const showAboutModal = () => setAboutVisible(true);
  const hideAboutModal = () => setAboutVisible(false);

  //screen navigation
  const navigation = useNavigation();
  const toTickets = () => {
    navigation.navigate("Tickets");
  };  
  const toStops = () => {
    navigation.navigate("Stops");
  };  
  const toTripPlanner = () => {
    navigation.navigate("TripPlanner");
  };  
  const toFavorites = () => {
    navigation.navigate("Favorites");
  };

  //theme radio button
  const [value, setValue] = React.useState("first");
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  
  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Avatar.Icon style={styles.accountIcon} size={75} icon="account" />
        <View style={styles.accountHeader}>
          <Text style={styles.headerText}>Trackmeister</Text>
          <Text style={styles.headerNumber}>0987654321</Text>
        </View>
      </View>
      <Divider style={{ backgroundColor: "black", height: 1 }} />
      <View>
        <View style={styles.item}>
          <List.Item
            onPress={toTickets}
            title="Tickets"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="ticket" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            onPress={toTripPlanner}
            title="Trip Planner"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-clock" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            onPress={toStops}
            title="Stops"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons
                style={styles.icon}
                name="bus-stop-covered"
              />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            onPress={toFavorites}
            title="Favorites"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="star" />
            )}
          />
        </View>
      </View>
      <Divider style={{ backgroundColor: "black", height: 1 }} />
      <View>
        <View style={styles.item}>
          <List.Item
            title="Change Language"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="web" />
            )}
          />
        </View>

        <View style={styles.item}>
          <List.Item
            title="Support"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="help-circle" />
            )}
          />
        </View>

        <View style={styles.item}>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.themeModal}
            >
              <Text style={styles.headerText}>Choose Theme</Text>
              <View>
                <RadioButton.Group
                  onValueChange={(newValue) => setValue(newValue)}
                  value={value}
                >
                  <RadioButton.Item label="System(auto)" value="auto" />
                  <RadioButton.Item label="Light" value="light" />
                  <RadioButton.Item label="Dark" value="dark" />
                </RadioButton.Group>
                <Switch
                color={'red'}
                value={isThemeDark}
                onValueChange={toggleTheme}
          />
              </View>
            </Modal>
          </Portal>
          <List.Item
            onPress={showModal}
            title="Change Theme"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons
                style={styles.icon}
                name="circle-half-full"
              />
            )}
          />
        </View>

        <View style={styles.item}>
          <Portal>
            <Modal
              visible={aboutVisible}
              contentContainerStyle={styles.themeModal}
              onDismiss={hideAboutModal}
            > 
              <View style={styles.aboutContainer}>
              <Image style={styles.logo} source={require('../assets/logo.png')} />
              <Text style={styles.headerText}>Trackmeister</Text>
              </View>
              <Text style={styles.aboutText}>
                For Kadamba Transport Corporation Limited
              </Text>
              <Text style={styles.aboutText}>Build: 0.1.0 Dev</Text>
              
              <View style={styles.buttonContainer}>
                <Button onPress={hideAboutModal} style={styles.button} labelStyle={styles.buttonText}>
                  GITHUB
                </Button>
                <Button onPress={hideAboutModal} style={styles.button} labelStyle={styles.buttonText}>
                  CLOSE
                </Button>
              </View>
            </Modal>
          </Portal>
          <List.Item
            onPress={showAboutModal}
            title="About"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="information" />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: "5%",
  },
  accountHeader: {
    justifyContent: "center",
  },
  accountIcon: {
    marginRight: 15,
    backgroundColor: "black",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    fontSize: 50,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 22,
    fontWeight: "400",
  },
  themeModal: {
    backgroundColor: 'white',
    marginHorizontal: "10%",
    justifyContent: "center",
    padding: 25,
    borderRadius: 25,
  },
  icon: {
    fontSize: 24,
    color: "black",
    marginLeft: "5%",
  },
  aboutContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  buttonText: { 
    fontSize: 18,
  },
  aboutText:  {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: 'bold'
  },
  logo: {
    height: 70,
    width: 50,
  }
});

export default Account;
