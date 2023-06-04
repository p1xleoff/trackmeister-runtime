import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchX = ({ searchText, setSearchText }) => {
  const handleSearchInput = (text) => {
    setSearchText(text);
  };

  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search"
      value={searchText}
      onChangeText={handleSearchInput}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    color: 'black',
  },
})
export default SearchX;
