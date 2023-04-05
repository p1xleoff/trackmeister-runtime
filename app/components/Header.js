import React from 'react';
import { Appbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title = options.headerTitle !== undefined
    ? options.headerTitle
    : options.title !== undefined
      ? options.title
      : scene.route.name;

<Appbar.Action 
          style={styles.profileIcon}
          icon="account" 
          onPress={() => console.log('Profile icon pressed')} />    
  return (
    <Appbar.Header>
      {previous && (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.primary}
        />
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
 