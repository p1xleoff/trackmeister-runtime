import React, { useState, useContext, useEffect } from 'react';
import { View, Alert, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { auth } from '../data/firebaseConfig';
import axios from 'axios';
import { TextInput, Avatar } from 'react-native-paper';
import themeContext from "../config/themeContext";
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Profile () {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    // Fetch the current user's data from Firebase Realtime Database
    const currentUser = auth.currentUser;
    const databaseURL = 'https://trackmeister0-default-rtdb.asia-southeast1.firebasedatabase.app';
    const endpoint = `${databaseURL}/users/${currentUser.uid}.json`;

    axios
      .get(endpoint)
      .then((response) => {
        const { name, phoneNumber, profilePicture } = response.data || {};
        setName(name || '');
        setPhoneNumber(phoneNumber || '');
        setProfilePicture(profilePicture || null);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleProfileUpdate = () => {
    const phoneRegex = /^\d{10}$/;

    if (!name) {
      Alert.alert('Please enter your name');
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    const currentUser = auth.currentUser;
    const databaseURL = 'https://trackmeister0-default-rtdb.asia-southeast1.firebasedatabase.app';
    const endpoint = `${databaseURL}/users/${currentUser.uid}.json`;

    const profileData = {
      email: currentUser.email,
      name,
      phoneNumber,
      profilePicture,
    };

    axios
      .patch(endpoint, profileData)
      .then(() => {
        console.log('Profile updated:', profileData);
        Alert.alert('Profile updated')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Please grant permission to access the camera roll.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      const { assets } = result;
      if (assets.length > 0) {
        const { uri } = assets[0];
        setProfilePicture(uri); // Store the URI of the selected image in the state
      }
    }
  };

  const renderProfilePicture = () => {
    return (
      <View style={styles.pictureContainer}>
        <TouchableOpacity onPress={selectProfilePicture}>
          { profilePicture ? (
            <>
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
              <TouchableOpacity style={styles.cameraIconContainer} onPress={selectProfilePicture}>
                <MaterialCommunityIcons color={"#000"} size={24} name="camera" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Avatar.Icon style={styles.defaultProfilePicture} size={150} icon="account" />
              <TouchableOpacity style={styles.cameraIconContainer} onPress={selectProfilePicture}>
                <MaterialCommunityIcons color={'#000'} size={24} name="camera" />
              </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{alignItems: 'center'}}>
            {renderProfilePicture()}
        </View>
        <TextInput
          style={styles.input}
          label="Email"
          editable={false}
          textColor={theme.color}
          activeUnderlineColor={theme.accent}
          value={auth.currentUser?.email}
          left={<TextInput.Icon icon="email-outline" />}
        />
        <TextInput
          style={styles.input}
          label="Name"
          keyboardType="name-phone-pad"
          textColor={theme.color}
          outlineStyle={styles.inputOutline}
          activeUnderlineColor={theme.accent}
          value={name}
          onChangeText={handleNameChange}
          left={<TextInput.Icon icon="at" />}
        />
        <TextInput
          style={styles.input}
          label="Phone"
          keyboardType="number-pad"
          textColor={theme.color}
          outlineStyle={styles.inputOutline}
          activeUnderlineColor={theme.accent}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          left={<TextInput.Icon icon="phone" />}
        />
        <TouchableOpacity style={styles.button} onPress={handleProfileUpdate}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      marginHorizontal: '5%',
    },
    pictureContainer: {
      position: 'relative',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginBottom: 20,
    },
    profilePicture: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginVertical: 20,
      borderWidth: 2,
      borderColor: theme.accent,
    },
    defaultProfilePicture: {
      backgroundColor: theme.color,
      marginVertical: 20,
    },
    cameraIconContainer: {
      position: 'absolute',
      bottom: 20,
      right: 0,
      backgroundColor: theme.accent,
      padding: 10,
      borderRadius: 30,
    },
    input: {
      backgroundColor: theme.background,
      marginBottom: 10,
    },
    button: {
      width: '100%',
      borderRadius: 9,
      marginVertical: '10%',
      alignItems: 'center',
      backgroundColor: theme.background,
      paddingVertical: '3%',
      elevation: 10,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.accent,
      letterSpacing: 1,
    },
  });
