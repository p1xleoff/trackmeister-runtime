import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import themeContext from "../config/themeContext";

const Language = () => {

  const theme = useContext(themeContext);
  const styles = getStyles(theme);

  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const renderLanguageOption = (language) => {
    const isSelected = selectedLanguage === language;
    return (
      <TouchableOpacity
        key={language}
        style={[
          styles.languageOption,
          isSelected && styles.selectedLanguageOption,
        ]}
        onPress={() => handleLanguageSelect(language)}
      >
        <Text
          style={[
            styles.languageOptionText,
            isSelected && styles.selectedLanguageOptionText,
          ]}
        >
          {language}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your preferred language</Text>
      <View style={styles.languageOptionsContainer}>
        {renderLanguageOption('English')}
        {/* Add more language options here */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log(selectedLanguage)}>
          <Text style={styles.buttonText}>Continue</Text>
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
  title: {
    fontSize: 20,
    margin: 20,
    color: theme.color
  },
  languageOptionsContainer: {
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  languageOption: {
    borderWidth: 1,
    borderColor: theme.highlight,
    backgroundColor: theme.background,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '90%',
    color: theme.color,
  },
  selectedLanguageOption: {
    backgroundColor: theme.accent,
  },
  languageOptionText: {
    fontSize: 16,
    color: theme.color
  },
  selectedLanguageOptionText: {
    color: '#fff',
  },
  buttonContainer: {
    flex: 2,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: "90%",
  },
  button: {
    flex: 1,
    width: '100%',
    borderRadius: 9,
    alignItems: 'center',
    backgroundColor: theme.accent,
    paddingVertical: '3%',
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Language;
