import React, { useState, useEffect, useContext } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import themeContext from "../config/themeContext";


const Login = () => {
  
  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation();
  const toRegister = () => {
    navigation.navigate('Register');
  };  
  const tolanding = () => {
    navigation.navigate('Landing');
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
      navigation.replace("Landing")    
      }
    });
  }, [] )

  //logging in
const handleLogIn = () => {  

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log('Logged in with: ', user.email);
    Alert.alert('Welcome back!');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert('Incorrect Email or Password');
  });
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LogIn</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        keyboardType='email-address'
        textColor={theme.color}
        outlineStyle={styles.inputOutline}
        activeOutlineColor={theme.accent}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        value={password}
        textColor={theme.color}
        outlineStyle={styles.inputOutline}
        activeOutlineColor={theme.accent}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <View>
        <TouchableOpacity 
        style={styles.button}
        onPress={handleLogIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity> 
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.text}>
            Dont have an account? 
                <Text 
                  onPress={toRegister}
                  style={{fontWeight: 'bold', fontSize: 24}}> Sign Up
                </Text>
        </Text>
      </View>
    </View>
  );
};

const getStyles = (theme)  =>
StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
    padding: 20,
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
    backgroundColor: theme.accent,
    paddingVertical: '3%',
    elevation: 10,
},  
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
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

export default Login; 