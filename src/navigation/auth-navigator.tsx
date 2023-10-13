import { createStackNavigator } from '@react-navigation/stack';
import { SPLASH, LOGIN, SIGNUP } from '../constants/routeName';

// screens
import Splash from '../screens/splash';
import Login from '../screens/login';
import Signup from '../screens/signup';

const Stack = createStackNavigator();

export function AuthNavigator () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name={SPLASH} component={Splash} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={SIGNUP} component={Signup} />
    </Stack.Navigator>
  );
}