import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class LoginScreen extends React.Component{
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
  };
  render(){
    return (
      <View style={styles.container}>
        <Text>SettingsScreen</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
});
