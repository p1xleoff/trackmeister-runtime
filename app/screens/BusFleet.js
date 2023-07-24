import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import themeContext from "../config/themeContext";
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import axios from 'axios';

export default function BusFleet() {
  const db = getDatabase();
  const theme = useContext(themeContext);
  const styles = getStyles(theme);
  const [data, setData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [selectedBus, setSelectedBus] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); 

  useEffect(() => {
    setIsMounted(true);

    const starCountRef = ref(db, 'busFleet');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
      setIsLoading(false);
    });

    return () => {
      setIsMounted(false);
      off(starCountRef);
    };
  }, []);

  const makeApiRequest = async (selectedBusNumber) => {
    try {
      const timestamp = new Date().getTime();
      const url = `http://65.1.176.163:3000/api?timestamp=${timestamp}`;

      const payload = {
        VehicleRegNo: selectedBusNumber
      };
      console.log('API Request Payload:', payload);

      const response = await axios.post(url, payload);
      console.log('API Response:', response.data);

      if (response.data.VehicleDetail.length > 0) {
        const vehicle = response.data.VehicleDetail[0];
        const busLocation = {
          latitude: vehicle.Latitude,
          longitude: vehicle.Longitude
        };
        console.log('Bus Location:', busLocation);
        const formattedRegNo = selectedBusNumber.replace(/(\w{2})(\w{2})(\w)(\w+)/, '$1-$2-$3-$4');

        // show modal with selected bus
        setSelectedBus({
          busLocation,
          regNo: formattedRegNo,
          engineStatus: vehicle.EngineStatus
        });
        setModalVisible(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBusPress = async (regNo) => {
    await makeApiRequest(regNo);
  };  

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateToBusMap = () => {
    setModalVisible(false);
    navigation.navigate('BusMap', {
      busLocation: selectedBus.busLocation,
      regNo: selectedBus.regNo
    });
  };

  const renderEngineStatus = () => {
    if (selectedBus.engineStatus === 'On') {
      return <Text style={styles.engineStatusText}>Running</Text>;
    } else {
      return <Text style={styles.engineStatusText}>Not Running</Text>;
    }
  };

  const renderItem = ({ item }) => {
    const regNo = item.regNo;
    const formattedRegNo = regNo.replace(/(\w{2})(\w{2})(\w)(\w+)/, '$1 $2 $3 $4');

    return (
      <TouchableOpacity style={styles.item} onPress={() => handleBusPress(item.regNo)}>
        <Text style={styles.title}>{formattedRegNo}</Text>
        {isLoading && <ActivityIndicator size="small" color={theme.accent} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Bus Fleet</Text>
      </View>
        <FlatList
          style={styles.list}
          data={Object.values(data)}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />

      <Modal visible={modalVisible} 
              transparent={true} 
              animationType='slide'
              statusBarTranslucent={true}
              onRequestClose={() => setModalVisible(false)}
        >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedBus && (
                <View>
                  <Text style={styles.modalText}>Bus Number: 
                    <Text style={{fontWeight: 'bold'}}> {selectedBus.regNo}</Text>
                  </Text>
                  <Text style={styles.modalText}>Status: 
                    <Text style={{fontWeight: 'bold'}}> {renderEngineStatus()}</Text>
                  </Text>
                  <TouchableOpacity style={styles.modalButton} onPress={navigateToBusMap}>
                    <Text style={styles.modalButtonText}>Track Bus</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    item: {
      padding: 15,
      borderWidth: 1,
      borderColor: theme.highlight,
      marginBottom: 9,
      borderRadius: 10,
    },
    title: {
      fontWeight: 'bold',
      color: theme.color,
      fontSize: 16
    },
    list: {
      marginHorizontal: '5%',
      color: theme.color
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },
    header: {
      fontWeight: 'bold',
      fontSize: 18,
      color: theme.accent
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: theme.highlight,
      padding: 20,
      borderRadius: 10,
      width: '80%',
      justifyContent: 'center',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
      color: theme.color
    },
    modalButton: {
      backgroundColor: theme.accent,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
