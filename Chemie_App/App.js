import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Expo, Asset, AppLoading} from 'expo';
import {createStackNavigator} from 'react-navigation';


import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import SplashScreen from './src/SplashScreen';

export default class App extends React.Component {
  render(){
    return (
      <ChemieApp/>
    );
  }
}


const ChemieApp = createStackNavigator({
    // TODO: Add splashscreen to navigation
    Splash:{screen: SplashScreen},
    Login:{screen: LoginScreen},
    Home: {screen: HomeScreen},

  },{
    headerMode: 'none'
});
