import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Expo, Asset, AppLoading} from 'expo';
import {createStackNavigator} from 'react-navigation';

import HomeScreen from './src/Home/HomeScreen';
import LoginScreen from './src/Login/LoginScreen';
import NotificationScreen from './src/Notification/NotificationScreen';
import SplashScreen from './src/Splash/SplashScreen';
import SladderScreen from './src/Sladder/SladderScreen';
import SettingsScreen from './src/Settings/SettingsScreen';
import EventScreen from './src/Events/EventScreen';
import EventDetailScreen from './src/Events/EventDetailScreen';

export default class App extends React.Component {
  render(){
    return (
      <ChemieApp/>
    );
  }
}

// TODO: Figure out if we need landscapemode, currently disabled
// TODO: Fix splash from from preventing navigation from login to home
// TODO: remove navigation from home to login or loging to splash with back arrow
// TODO: Change style to be relative size to size of phone/tablet
// TODO: Add documentation
const ChemieApp = createStackNavigator({


    Splash:{screen: SplashScreen},
    Login:{screen: LoginScreen},
    Home:{screen: HomeScreen},
    Sladder:{screen:SladderScreen},
    Settings: {screen: SettingsScreen},
    Events: {screen: EventScreen},
    EventDetailScreen: {screen: EventDetailScreen},
    Notification: {screen: NotificationScreen},




  },{
    //headerMode: 'none'
});
