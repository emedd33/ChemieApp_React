import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Expo, Asset, AppLoading} from 'expo';
import {createStackNavigator} from 'react-navigation';


import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import SplashScreen from './src/SplashScreen';
import SettingsScreen from './src/SettingsScreen';

export default class App extends React.Component {
  render(){
    return (
      <ChemieApp/>
    );
  }
}


const ChemieApp = createStackNavigator({
    // TODO: Fix splash from from preventing navigation from login to home
    Splash:{screen: SplashScreen},
    Login:{screen: LoginScreen},

    Home:{screen: HomeScreen},
    Settings: {screen: SettingsScreen},




  },{
    headerMode: 'none'
});
