import { NavigationContainer } from '@react-navigation/native'
import { HomeNavigator } from './home-navigator'
import { AuthNavigator } from './auth-navigator'
import { useAuth } from '../hooks/useAuth'
import { useGlobalContext } from '../context/useGlobalContext'

const AppNavContainer = () => {
  const { user } = useAuth();
  const { isLoggedIn } = useGlobalContext();

  return (
    <NavigationContainer>
      {user || isLoggedIn ? <HomeNavigator /> : <AuthNavigator /> }
    </NavigationContainer>
  )
}

export default AppNavContainer;