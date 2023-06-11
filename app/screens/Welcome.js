import React from 'react';
import { View, StyleSheet, Image, Pressable, StatusBar, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//import theme from '../config/theme';

function Welcome(props) {
    
    const navigation = useNavigation();
    const toRegister = () => {
      navigation.navigate('Register');
    };
    const toLogin = () => {
        navigation.navigate('Login');
      };
    
    return (
        
        <View style = {styles.container}>
            <View style = {styles.imageContainer}>
            <Image
                style = {styles.image}
                source = {require('../assets/background.jpg')} />
            </View>
                <Pressable
                    style = {styles.button}
                    onPress={toRegister}>
                        <Text style = {styles.text}>SIGN UP</Text>
                </Pressable>
                
                <Pressable
                    style = {styles.button}
                    onPress={toLogin}>
                        <Text style = {styles.text}>LOG IN</Text>
                </Pressable>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: StatusBar.currentHeight,
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: 350,
        borderRadius: 18,
    },
    button: {
        width: '90%',
        borderRadius: 9,
        marginVertical: '2%',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: '3%',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: 1,
    },
})

export default Welcome;