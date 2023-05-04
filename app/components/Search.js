import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import themeContext from "../config/themeContext";
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SearchPlaces = () => {
    const theme = useContext(themeContext);
    const styles = getStyles(theme);
    const [location, setLocation] = useState(null);
    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Location permission not granted');
                return;
            }

            let { coords } = await Location.getCurrentPositionAsync({});
            setLocation(coords);
        })();
    }, []);
    
    const query = {
        key: apikey,
        language: "en",
        type: 'transit_station',
        components: "country:IN",
        location: location ? `${location.latitude},${location.longitude}` : null,
        radius: 10000
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <MaterialCommunityIcons name="magnify" size={26} color={theme.color} style={styles.icon} />
                <GooglePlacesAutocomplete
                    placeholder="Search for stops"
                    query={query}
                    onPress={(data, details = null) => {
                        console.log(data, details);
                    }}
                    onFail={(error) => console.error(error)}
                    styles={{
                        container: {
                            flex: 1,
                        },
                        textInput: {
                            backgroundColor: theme.barColor,
                            borderRadius: 30,
                            height: 50,
                            fontSize: 16,
                            color: theme.color,
                        },
                        listView: {
                            backgroundColor: 'black',
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                            marginTop: 10,
                        },
                        separator: {
                            height: 1,
                            backgroundColor: '#ccc',
                        },
                    }}
                />
            </View>
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        marginHorizontal: '5%',
        marginTop: StatusBar.currentHeight + 10,
        borderRadius: 200,
        elevation: 5,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        padding: 2,
        backgroundColor: theme.barColor,
    },
    icon: {
      marginLeft: 10,
    }
});

export default SearchPlaces;
