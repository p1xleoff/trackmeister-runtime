import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Pressable, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import themeContext from "../config/themeContext";

const Register = () => {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
      navigation.replace("Landing")    
      }
    });
  }, [] )
  
  const navigation = useNavigation();
  const toLogin = () => {
    navigation.navigate('Login');
  };
  const tolanding = () => {
    navigation.navigate('Landing');
  };
  //sign up
  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('registered with: ', user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        textColor={theme.color}
        outlineColor={theme.accent}
        activeOutlineColor={theme.accent}
        keyboardType='email-address'
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        outlineColor={theme.accent}
        activeOutlineColor={theme.accent}
        value={password}
        textColor={theme.color}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <View>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSignUp}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.text}>
            Already have an account? 
                <Text 
                  onPress={toLogin}
                  style={{fontWeight: 'bold', fontSize: 24}}> Log In
                </Text>
        </Text>
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
}

});

export default Register; 