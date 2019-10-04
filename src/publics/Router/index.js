import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../../screens/main/HomeScreen'
import ChatScreen from '../../screens/main/ChatScreen'
import ProfileScreen from '../../screens/main/ProfileScreen'

import LoadingScreen from '../../screens/auth/LoadingScreen'
import LoginScreen from '../../screens/auth/LoginScreen'
import RegisterScreen from '../../screens/auth/RegisterScreen'

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Chat: ChatScreen,
    Profile: ProfileScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

const AuthNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Home: HomeStack,
  },
  {
    initialRouteName: 'Loading',
  }
)

const Router = createAppContainer(AuthNavigator);

export default Router
