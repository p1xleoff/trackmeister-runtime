import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

//import theme from '../config/theme';

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

  const navigation = useNavigation();
  const toWelcome = () => {
    navigation.navigate('Welcome');
  };
  const toLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
        label="Name"
        value={name}
        onChangeText={handleNameChange}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
      />
      <View>
        <Pressable style={styles.button} onPress={toLogin}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </Pressable>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 9,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    borderRadius: 9,
    marginVertical: '10%',
    alignItems: 'center',
    backgroundColor: 'gold',
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
    color: 'gold',
},
  textWrap: {
  alignItems: 'center',
},
  text: {
  fontSize: 20,
}

});

export default Register; 