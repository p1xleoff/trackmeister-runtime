import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import _ from 'lodash';

const SmoothSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  console.log('onSearch:', onSearch);

  const debouncedSearch = _.debounce(onSearch, 500);

  console.log('debouncedSearch:', debouncedSearch);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={handleSearch}
      value={searchTerm}
      placeholder="Search"
    />
  );
};

export default SmoothSearchBar;
