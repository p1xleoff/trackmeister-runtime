import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Avatar, Divider, List, Modal, Portal, Button, Switch } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../data/firebaseConfig';
import axios from 'axios';
import themeContext from "../config/themeContext";
import { TouchableOpacity } from "react-native-gesture-handler";

function Account() {
  //theme modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

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
  const toFavorites = () => {
    navigation.navigate("Favorites");
  };  
  const toProfile = () => {
    navigation.navigate("Profile");
  };

  //theme radio button
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [ mode, setMode ]  = useState(false);

  useEffect(() => {
    // Fetch the current user's data from Firebase Realtime Database
    const currentUser = auth.currentUser;
    const databaseURL = 'https://trackmeister0-default-rtdb.asia-southeast1.firebasedatabase.app';
    const endpoint = `${databaseURL}/users/${currentUser.uid}.json`;

    axios
      .get(endpoint)
      .then((response) => {
        const { name, profilePicture } = response.data || {};
        setName(name || '');
        setProfilePicture(profilePicture || '');
      })
  }, []);

  //firebase
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toProfile}>
      <View style={styles.accountContainer}>
            {profilePicture ? (
          <Avatar.Image
            style={styles.accountIcon}
            size={75}
            source={{ uri: profilePicture }}
          />
        ) : (
          <Avatar.Icon style={styles.accountIcon} size={75} icon="account" />
        )}
        <View style={styles.accountHeader}>
            <Text style={styles.headerText}>{name}</Text>
            <Text style={{fontSize: 16, color: theme.color, fontWeight: '600'}}>{auth.currentUser?.email}</Text>
            
        </View>
      </View>
          </TouchableOpacity>
      <Divider style={{ backgroundColor: "black", height: 1, marginVertical: 10, width: '90%', alignSelf: 'center' }} />
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
            <View style={[styles.item]}>
              <List.Item
                onPress={toStops}
                title="Stops"
                titleStyle={styles.itemText}
                left={() => (
                <MaterialCommunityIcons style={styles.icon} name="bus-stop-covered" />
                )}
                />
            </View>

        {/* <View style={styles.item}>
          <List.Item
            onPress={toTripPlanner}
            title="Trip Planner"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="bus-clock" />
            )}
          />
        </View> */}

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
      <Divider style={{ backgroundColor: "black", height: 1, marginVertical: 10, width: '90%', alignSelf: 'center' }} />
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
              contentContainerStyle={styles.themeModal}>
              <Text style={styles.headerText}>Choose Theme</Text>
              <View style={[styles.aboutContainer, {justifyContent: "space-between"}]}>
              <Text style={styles.aboutText}>
                Dark Mode
              </Text>
              <Switch
              color={theme.accent}
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
        <Divider style={{ backgroundColor: "black", height: 1, marginVertical: 10, width: '90%', alignSelf: 'center' }} />
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
                <Button onPress={hideAboutModal} labelStyle={styles.buttonText}>
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
        <View style={styles.item}>
          <List.Item
            onPress={handleSignOut}
            title="Log Out"
            titleStyle={styles.itemText}
            left={() => (
              <MaterialCommunityIcons style={styles.icon} name="logout-variant" />
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
    marginVertical: '5%',
  },
  accountHeader: {
    justifyContent: "center",
    flexShrink: 1
  },
  accountIcon: {
    marginRight: 15,
    backgroundColor: theme.color,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.accent,
  },
  item: {
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  itemText: {
    fontWeight: "700",
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
    marginHorizontal: '2%'
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
    justifyContent: 'flex-end',
  },
  buttonText: { 
    color: theme.accent
  },
  aboutText:  {
    fontSize: 14,
    marginVertical: 5,
    fontWeight: 'bold',
    color: theme.color,
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 10
  },
});

export default Account;
