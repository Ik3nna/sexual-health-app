import { NavigationContainer } from '@react-navigation/native'
import { HomeNavigator } from './home-navigator'
import { AuthNavigator } from './auth-navigator'
import { useAuth } from '../hooks/useAuth'

const AppNavContainer = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AuthNavigator /> : <HomeNavigator /> }
    </NavigationContainer>
  )
}

export default AppNavContainer;