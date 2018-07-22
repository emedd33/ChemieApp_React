import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class LoginScreen extends React.Component{
  static navigationOptions = {
    title: 'Settings',
    header: null,
  };

  render(){
    return (
      <View>
        <Text>hhh</Text>
        <Text onPress={(()=>this.props.navigation.navigate('Login'))}>press</Text>
      </View>
    );
  }
}
