import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Account from './Account';
import Route from './Route';
import Welcome from './Welcome';

const TabNavigator = createMaterialTopTabNavigator({
  Tab1: { screen: Route },
  Tab2: { screen: Account },
  Tab3: { screen: Welcome },
});

export default createAppContainer(TabNavigator);
