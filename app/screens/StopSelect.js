import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import themeContext from "../config/themeContext";

function StopSelect() {
  const [modalVisible, setModalVisible] = useState(false);
  const [boardingStop, setBoardingStop] = useState(null);
  const [alightingStop, setAlightingStop] = useState(null);
  
  const navigation = useNavigation();

  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  // Bus stops
  const busStops = [
    { id: 1, name: 'Old Bus Stand, Ponda' },
    { id: 2, name: 'Panjim Bus Stand' },
    { id: 3, name: 'Mapusa Bus Stand' },
    { id: 4, name: 'Margao Bus Stand' },
    { id: 5, name: 'Goa Medical College' },
    { id: 6, name: 'Mopa Airport' },
    { id: 7, name: 'Curchorem Bus Stand' },
    { id: 8, name: 'Vasco Bus Stand' },
  ];

  // Fare Matrix
  const fareMatrix = [
    [0, 34, 35 , 34, 40, 35, 35, 35],
    [34, 0, 15, 40, 35, 200, 60, 34],
    [35, 35, 0, 70, 35, 200, 35, 35],
    [35, 34, 70, 0, 35, 400, 30, 35],
    [40, 35, 35, 35, 0, 35, 35, 35],
    [35, 200, 200, 400, 35, 0, 35, 35],
    [35, 60, 35, 30, 35, 35, 0, 35],
    [35, 34, 35, 35, 35, 35, 35, 0],
  ];

  const handleSelectStop = (stop) => {
    setModalVisible(false);
    if (boardingStop === null) {
      setBoardingStop(stop);
    } else {
      setAlightingStop(stop);
    }
  };

  const resetStops = () => {
    setBoardingStop(null);
    setAlightingStop(null);
  };

  const handlePurchase = () => {
    if (boardingStop && alightingStop) {
      // Calculate the ticket price based on the fare matrix
      const ticketPrice = fareMatrix[boardingStop.id - 1][alightingStop.id - 1];

      // Proceed to the PurchaseScreen with necessary parameters
      navigation.navigate('Purchase', {
        boardingStop: boardingStop.name,
        alightingStop: alightingStop.name,
        ticketPrice: ticketPrice,
      });

      // Reset selected stops after the purchase
      resetStops();
    } else {
      Alert.alert('Oh wait!', 'Please select both boarding and alighting stops.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stopContainer}>
        <Text style={styles.heading}>From: </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
          <Text style={styles.text}>
            {boardingStop ? boardingStop.name : 'Select Stop'}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.heading, { marginTop: 25 }]}>To:</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.button, { marginBottom: 10 }]}>
          <Text style={styles.text}>
            {alightingStop ? alightingStop.name : 'Select Stop'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handlePurchase} style={styles.buyButton}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Select a Stop</Text>
            {busStops.map((stop) => (
              <TouchableOpacity
              key={stop.id}
              style={styles.stopOption}
              onPress={() => handleSelectStop(stop)}
              >
                <Text style={styles.modalText}>{stop.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: theme.subtext,
  },
  stopContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: theme.highlight,
    backgroundColor: theme.background,
    elevation: 10,
  },
  text: {
    fontWeight: 400,
    fontSize: 16,
    color: theme.color,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: theme.background,
    borderColor: theme.highlight,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  buyButton: {
    position: 'absolute',
    bottom: 10,
    width: '100%',    
    alignSelf : 'center',
    backgroundColor: theme.accent,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    elevation: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: theme.highlight,
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.color,
    alignSelf: 'center'
  },
  modalText:  {
    color: theme.color,
    fontSize: 18
  },
  stopOption: {
    fontSize: 32,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.option,
    color: theme.color
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default StopSelect;
