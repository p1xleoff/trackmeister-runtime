import { DefaultTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    background: '#fff',
    text: '#333333',
    secondaryContainer : 'gold'
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    background: '#1a1a1a',
    text: '#ffffff',
    secondaryContainer : 'gold'
  },
};
