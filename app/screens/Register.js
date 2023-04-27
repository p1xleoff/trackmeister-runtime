import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import themeContext from "../config/themeContext";

const Register = () => {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
      navigation.replace("Landing")    
      }
    });
  }, [] )
  
  const toLogin = () => {
    navigation.navigate('Login');
  };
  const toLanding = () => {
    navigation.navigate('Landing');
  };  
  const toPhoneAuth = () => {
    navigation.navigate('PhoneAuth');
  };
  //sign up
  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Please enter an email and password');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }
  
    if (!isValidPassword(password)) {
      Alert.alert('The password must be at least 8 characters long');
      return;
    }    if (!isvalidNumber(phoneNumber)) {
      Alert.alert('Invalid Phone Number');
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('registered with: ', user.email);
        Alert.alert('Welcome!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const isValidEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password) => {
    return password.length >= 6;
  };
  const isvalidNumber = (phoneNumber) => {
    return phoneNumber.length == 10;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        textColor={theme.color}
        outlineStyle={styles.inputOutline}
        activeOutlineColor={theme.accent}
        keyboardType='email-address'
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"       
        outlineStyle={styles.inputOutline}
        activeOutlineColor={theme.accent}
        value={password}
        textColor={theme.color}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Phone Number"
        keyboardType='phone-pad'
        outlineStyle={styles.inputOutline}
        activeOutlineColor={theme.accent}
        textColor={theme.color}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <View>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSignUp}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.text}>
            Already have an account? 
                <Text onPress={toLogin}
                  style={{fontWeight: 'bold', fontSize: 24}}> Log In
                </Text>
        </Text>
        {/* <TouchableOpacity style={styles.button} onPress={toLanding}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const getStyles = (theme) =>
StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.background,
  },
  input: {
    backgroundColor: theme.background,
    borderRadius: 9,
    marginBottom: 10,
    color: theme.color,
  },
  button: {
    width: '100%',
    borderRadius: 9,
    marginVertical: '10%',
    alignItems: 'center',
    backgroundColor: theme.accent,
    paddingVertical: '3%',
    elevation: 5,
},  
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 1,
},
  title: {
    marginVertical: '20%',
    width: '100%',
    fontSize: 66,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: theme.accent,
},
  textWrap: {
  alignItems: 'center',
},
  text: {
  color: theme.color,
  fontSize: 20,
},
  inputOutline: {
    borderRadius: 9, 
    borderColor: theme.accent
  }
});

export default Register; 