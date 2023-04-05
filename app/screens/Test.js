import React from 'react';
import { View } from 'react-native';
import { useTheme, Appbar, TouchableRipple, Switch } from 'react-native-paper';
import { PreferencesContext } from '../config/PreferencesContext';

function Test() {
  const Header = ({ scene }) => {
    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  
    return (
      <Appbar.Header
        theme={{
          colors: {
            primary: theme?.colors.surface,
          },
        }}
      >
        <Appbar.Content title={scene.route?.name} />
          <Switch
            color={'red'}
            value={isThemeDark}
            onValueChange={toggleTheme}
          />
      </Appbar.Header>
    );
  };

  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header scene={{ route: { name: 'Test Screen' } }} />
      {/* rest of the content */}
    </View>
  );
}

export default Test;
