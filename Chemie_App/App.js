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




class Home extends React.Component {
  static navigationOptions = {
    title: 'Hometest',
  };
  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigate('Profile')}> Navigate to Profile
        </Text>

      </View>
    );
  }
}





const ChemieApp = createStackNavigator({
    Login:{screen: LoginScreen},
    Home: {screen: HomeScreen},
},{
  navigationOptions:{
    
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


class ProfileScreen extends React.Component{
  static navigationOptions = {
    title: 'Profile',
  };
  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigate('Home')}> Navigate to Home
        </Text>
      </View>
    );
  }
}
