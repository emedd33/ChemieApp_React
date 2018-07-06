import React from 'react';
import {View, Text, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';

import LoginForm from './loginForm'
export default class Login extends React.Component{
  render(){
    return (

      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.loginContainer}>
          <Image
            resizeMode='contain'
            style={styles.logo}
            source={require('./hclogo.png')} />
        </View>
        <View style={styles.formConatiner}>
          <LoginForm />
        </View>
      </KeyboardAvoidingView>
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
