import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Image,TouchableOpacity } from "react-native";
import {
  Avatar,
  Divider,
  List,
  Modal,
  Portal,
  Button,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";
import { getAuth, signOut } from 'firebase/auth';

import themeContext from "../config/themeContext";

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
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [ mode, setMode ]  = useState(false);

  
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
        console.log('user signed out');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Avatar.Icon style={styles.accountIcon} size={75} icon="account" />
        <View style={styles.accountHeader}>
          <Text style={styles.headerText}>{auth.currentUser?.email}</Text>
          <TouchableOpacity onPress={handleSignOut}><Text style={styles.headerNumber}>Sign Out</Text></TouchableOpacity>
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
        <View>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.themeModal}>
              <Text style={styles.headerText}>Choose Theme</Text>
              <View style={[styles.aboutContainer, {justifyContent: "space-between"}]}>
              <Text style={styles.aboutText}>
                Dark Mode
              </Text>
              <Switch
              color={'#ffbf00'}
              value={mode}
              onValueChange={(value) => {
              setMode(value);
              EventRegister.emit("changeTheme", value)
            }}/>
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
              onDismiss={hideAboutModal}> 
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

const getStyles = (theme) => 
StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
    marginTop: '15%',
    marginBottom: '5%',
  },
  accountHeader: {
    justifyContent: "center",
  },
  accountIcon: {
    marginRight: 15,
    backgroundColor: theme.color,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.color,
  },
  headerNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.color,
  },
  item: {
    fontSize: 50,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 22,
    fontWeight: "400",
    color: theme.color,
  },
  themeModal: {
    backgroundColor: theme.modal,
    marginHorizontal: "10%",
    justifyContent: "center",
    padding: 25,
    borderRadius: 20,
    color: theme.color,
  },
  icon: {
    fontSize: 24,
    color: theme.color,
    marginLeft: "5%",
  },
  aboutContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: theme.color,
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
    fontWeight: 'bold',
    color: theme.color,
  },
  logo: {
    height: 70,
    width: 50,
  }
});

export default Account;
