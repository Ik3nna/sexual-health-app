import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CALENDAR, GRAPHICS, HOME, HOMEPAGE, INFO, PEOPLE } from '../constants/routeName';
import { StyleSheet, View } from 'react-native';
import Icon from '../components/icons';
import colors from '../assets/themes/colors';
import { getFontSize } from '../utils/getFontSize';
import { useCustomFonts } from '../hooks/useCustomFonts';

// screens
import Info from '../screens/info';
import Home from '../screens/home';
import Calendar from '../screens/calendar';
import Graphics from '../screens/graphics';
import People from '../screens/people';

const Tab = createBottomTabNavigator();

function BottomTabs () {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            let type;
            if (route.name === HOME) {
              iconName = "home";
              type = "feather";
              size = focused ? 30 : 25;
            } else if (route.name === CALENDAR) {
              iconName = "calendar";
              type = "ant";
              size = focused ? 30 : 25;
            } else if (route.name === GRAPHICS) {
              iconName = "results";
              type = "foundation";
              size = focused ? 30 : 25;
            } else {
              iconName = "people";
              type = "octicons";
              size = focused ? 30 : 25
            }
            return(
              <Icon type={type} name={iconName} size={size} color={color} />
            )
          },
          tabBarStyle: style.tabBarStyle,
          tabBarLabelStyle: { textTransform: "uppercase", paddingTop: "3%", fontSize: getFontSize(0.0165), fontFamily: "pro-bold" },
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.black,
          headerShown: false
        })
      }
      >
      <Tab.Screen name={HOME} component={Home} />
      <Tab.Screen name={CALENDAR} component={Calendar} />
      <Tab.Screen name={GRAPHICS} component={Graphics} />
      <Tab.Screen name={PEOPLE} component={People} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export function HomeNavigator () {
  return (
    <Stack.Navigator initialRouteName={INFO} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={INFO} component={Info} options={{ headerShown: false}} />
      <Stack.Screen name={HOMEPAGE} component={BottomTabs} />
    </Stack.Navigator>
  );
}

const style = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.tabBgColor,
    paddingTop: "2%",
  }
})