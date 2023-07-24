import React, { useState, useContext } from 'react';
import * as MailComposer from 'expo-mail-composer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import themeContext from "../config/themeContext";

export default function Support() {
  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  const supportEmail = () => {
    MailComposer.composeAsync({
      recipients: ['trackmeister.go@gmail.com'],
      subject: 'Support Request',
    });
  };
  
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item} onPress={handleComposeEmail}>
          <Text style={styles.itemText}>Send an Email</Text>
        </TouchableOpacity>
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
    itemContainer: {
        alignSelf: 'center',
        width: "90%",
        marginTop: 10
      },
    item: {
        width: '100%',
        borderRadius: 9,
        backgroundColor: theme.background,
        paddingVertical: '3%',
        elevation: 10,
      },
    itemText: {
        color: theme.color,
        fontSize: 24,
        paddingLeft: 10
      },
  });
  