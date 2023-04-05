import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import theme from '../config/theme';

const Register = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
    const handleNumberChange = (number) => {
      setNumber(number);
    };
  
  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSubmit = () => {
    console.log('Submitting form...', { name, email, number });
  };

  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
        <Text style = {styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Phone Number"
          value={number}
          onChangeNumber={handleNumberChange}
        />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={handleNameChange}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
      />
            <View>
                <Pressable
                    style = {styles.button}
                    onPress={handlePress}>
                        <Text style = {styles.buttonText}>SIGN UP</Text>
                </Pressable>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 9,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    borderRadius: 9,
    marginVertical: '10%',
    alignItems: 'center',
    backgroundColor: '#ff9900',
    paddingVertical: '3%',
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
    color: theme.colors.primary,
},


});

export default Register; 