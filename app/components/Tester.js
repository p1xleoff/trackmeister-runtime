import * as React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';

const Tester = () => {
  const [value, setValue] = React.useState('first');

  return (
    <View>
      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
        <RadioButton.Item label="First option" value="first" />
        <RadioButton.Item label="Second option" value="second" />
      </RadioButton.Group>
    </View>
  );
};

export default Tester;
