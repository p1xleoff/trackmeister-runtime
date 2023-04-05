import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

//import theme from '../config/theme';


const Login = () => {
    
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const handleNumberChange = (number) => {
    setNumber(number);
    };
  
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    console.log('Submitting form...', { number, password });
  };

  const navigation = useNavigation();
  const toWelcome = () => {
    navigation.navigate('Welcome');
  };
  const toRegister = () => {
    navigation.navigate('Register');
  };
  const toLanding = () => {
    navigation.navigate('Landing');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LogIn</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Phone Number"
        keyboardType="phone-pad"
        value={number}
        onChangeNumber={handleNumberChange}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={handlePasswordChange}
      />
      <View>
        <Pressable style={styles.button} onPress={toLanding}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </Pressable>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    borderRadius: 9,
    marginVertical: '10%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: '3%',
    elevation: 10,
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
    color: 'gold',
},
  textWrap: {
    alignItems: 'center',
},
  text: {
    fontSize: 20,
  }
});

export default Login; 