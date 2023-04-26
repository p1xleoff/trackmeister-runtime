import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { firebaseAuth } from '../data/firebaseConfig';

export default class Loading extends React.Component {
    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Landing' : 'Register')
        })
    }
render() {
    
return (
    
<View style={styles.container}>
 <Text>Loading</Text>
 <ActivityIndicator size="large" color='#FC8019'/>
</View>
)}
}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
}
})
