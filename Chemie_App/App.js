import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Expo, Asset, AppLoading} from 'expo';
import {createStackNavigator} from 'react-navigation';


import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import SplashScreen from './src/SplashScreen';
import SladderScreen from './src/SladderScreen';
import SettingsScreen from './src/SettingsScreen';

export default class App extends React.Component {
  render(){
    return (
      <ChemieApp/>
    );
  }
}

// TODO: Fix splash from from preventing navigation from login to home
// TODO: remove navigation from home to login or loging to splash with back arrow
// TODO: Change style to be relative size to size of phone/tablet

const ChemieApp = createStackNavigator({


    Splash:{screen: SplashScreen},
    Login:{screen: LoginScreen},
    Home:{screen: HomeScreen},
    Sladder:{screen:SladderScreen},
    Settings: {screen: SettingsScreen},




  },{
    headerMode: 'none'
});
