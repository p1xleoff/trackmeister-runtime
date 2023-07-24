import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet,  TouchableOpacity } from 'react-native';
import themeContext from "../config/themeContext";
import { useNavigation } from '@react-navigation/native';

function LocationReqInfo()  {
    const theme = useContext(themeContext);
    const styles =getStyles(theme);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Location Access Required</Text>
                <Text style={styles.text}>
                To provide you with accurate nearby bus stops and real-time tracking, 
                our app requires access to your device's location. We use your location 
                solely for this purpose and do not store or share it with any third parties.
                </Text>
                <Text style={styles.text}>
                Please grant location access to enjoy the full features of our app and make your 
                commuting experience more convenient and efficient.
                </Text>
            </View>
        </View>
    );
};

const getStyles = (theme) =>
StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    textContainer:  {
        marginHorizontal: '5%',
    },
    title:  {
        color: theme.color,
        fontSize: 20

    },
    text:   {
        color: theme.color,
        fontSize: 18
    }
})

export default LocationReqInfo;