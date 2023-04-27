import { React, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from "react-native-paper";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import themeContext from "../config/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Profile()  {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const navigation = useNavigation();

  //firebase
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

return  (
    <View style={styles.container}>
      <Avatar.Icon style={styles.avatar} size={75} icon="account" />
          <View style={styles.details}>
            <Text style={styles.text}>{auth.currentUser?.email}</Text>
            <Text style={styles.subText}>Email</Text>
          </View>          
          <View style={styles.details}>
            <Text style={styles.text}>9876543210</Text>
            
            <Text style={styles.subText}>Phone</Text>
          </View>
    </View>
    );
}
const getStyles = (theme) => 
StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 200,
    marginVertical: 20,
  },
  details: {
    width: '90%',
    height: '5%',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: theme.color
  },
  subText:  {
    fontSize: 12,
    color: theme.option,
  }
});

export default Profile;