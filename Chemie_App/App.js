import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import {createStackNavigator} from 'react-navigation';


import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';

export default class App extends React.Component {
  render(){
    return (
      <ChemieApp/>
    );
  }
}


const ChemieApp = createStackNavigator({
    // TODO: Add splashscreen to navigation

    Home: {screen: HomeScreen},
    Login:{screen: LoginScreen},
},{
  headerMode: 'none'
});
