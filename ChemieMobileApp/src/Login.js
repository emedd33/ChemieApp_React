import React from 'react';
import {View, Text, Image, StyleSheet, KeyBoardAvoidingView} from 'react-native';

import LoginForm from './loginForm'
export default class Login extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            resizeMode='contain'
            style={styles.logo}
            source={require('./hclogo.png')} />
        </View>
        <View style={styles.formConatiner}>
          <LoginForm />
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 300,
        height: 150
    },
});
