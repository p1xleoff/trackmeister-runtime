import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import themeContext from "../config/themeContext";
import { useNavigation } from '@react-navigation/native';

const PurchaseScreen = ({ route }) => {
  const { boardingStop, alightingStop, ticketPrice } = route.params;
  const [numTickets, setNumTickets] = useState(1);

  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const navigation = useNavigation();
  const toStopSelect = () => {
    navigation.navigate("StopSelect")
  };
  const toPayment = () => {
    navigation.navigate("Payment")
  };
  const handleTicketPurchase = () => {
    // Calculate the total ticket price based on the number of tickets selected
    const totalTicketPrice = ticketPrice * numTickets;

    // Add your logic to handle the ticket purchase here.
    // This function will be triggered when the "Buy Tickets" button is pressed.
    // You can perform actions like displaying a success message, storing the ticket data, or processing the payment.
    // For this example, we'll just log the ticket data to the console.

    const ticketData = {
      boardingStop: boardingStop,
      alightingStop: alightingStop,
      ticketPrice: ticketPrice,
      numTickets: numTickets,
      totalTicketPrice: totalTicketPrice,
      // Add other ticket details as needed
    };

    console.log('Ticket Purchase:', ticketData);

    // You can also navigate to a success screen or perform any other action here.
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeading}>Trip Details: </Text>
         <Text style={styles.label}>From: <Text style={styles.infoText}>{boardingStop}</Text></Text>
         <Text style={styles.label}>To: <Text style={styles.infoText}>{alightingStop}</Text> </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.ticketPrice}>Ticket Price: ₹{ticketPrice}</Text>  
        <Text style={styles.label}>Select the number of tickets:</Text>
        <View style={styles.ticketInputContainer}>
         <TouchableOpacity onPress={() => setNumTickets(numTickets - 1)} style={styles.ticketButton}>
            <MaterialCommunityIcons name="minus" size={24} color="black" style={styles.icon} />
         </TouchableOpacity>
         <Text style={styles.ticketCount}>{numTickets}</Text>
         <TouchableOpacity onPress={() => setNumTickets(numTickets + 1)} style={styles.ticketButton}>
            <MaterialCommunityIcons name="plus" size={24} color="black" style={styles.icon} />
         </TouchableOpacity>
        </View>
        
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.ticketPrice}>Total Price: ₹<Text style={styles.totalPrice}>{ticketPrice * numTickets}</Text></Text>
      </View>
      {/* button to proceed with the ticket purchase */}
      <TouchableOpacity onPress={handleTicketPurchase} style={styles.buyButton}>
        <Text style={styles.buttonText}>Buy Ticket</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toStopSelect} style={styles.cancelButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toPayment} style={[styles.cancelButton, {bottom: 110}]}>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.color,
  },
  infoContainer: {
    elevation: 10,
    padding: 10,
    borderRadius: 9,
    backgroundColor: theme.background,
    borderColor: theme.background,
    marginBottom: '5%',
  },    
  infoHeading: {
    color: theme.color,
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  infoLabel: {
    paddingVertical: 10
  },
  infoText: {
    color: theme.color,
    fontSize: 18,
    fontWeight: 'bold'
  },
  ticketPrice: {
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: theme.color,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: theme.color,
  },
  ticketInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: theme.color,
    alignSelf: 'center',
  },
  ticketButton: {
    padding: 5,
    borderRadius: 50,
    borderWidth: 2,
    color: theme.color,
    borderColor: theme.color
  },
  ticketButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.color,
  },
  ticketCount: {
    fontSize: 18,
    marginHorizontal: 20,
    color: theme.color,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.color,
  },
  buyButton: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: theme.accent,
    padding: 10,
    borderRadius: 9,
    width: '100%',
    alignSelf: 'center'
  },
  cancelButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 9,
    width: '100%',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  icon: {
    color: theme.color,
  },
});

export default PurchaseScreen;
