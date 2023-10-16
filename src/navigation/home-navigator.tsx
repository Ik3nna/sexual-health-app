import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CALENDAR, GRAPHICS, HOME, HOMEPAGE, INFO, PEOPLE } from '../constants/routeName';

// screens
import Info from '../screens/info';
import Home from '../screens/home';
import Calendar from '../screens/calendar';
import Graphics from '../screens/graphics';
import People from '../screens/people';

const Tab = createBottomTabNavigator();

function BottomTabs () {
  return (
    <Tab.Navigator>
      <Tab.Screen name={HOME} component={Home} options={{ headerShown: false }} />
      <Tab.Screen name={CALENDAR} component={Calendar} />
      <Tab.Screen name={GRAPHICS} component={Graphics} />
      <Tab.Screen name={PEOPLE} component={People} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export function HomeNavigator () {
  return (
    <Stack.Navigator initialRouteName={INFO}>
      <Stack.Screen name={INFO} component={Info} options={{ headerShown: false}} />
      <Stack.Screen name={HOMEPAGE} component={BottomTabs} />
    </Stack.Navigator>
  );
}