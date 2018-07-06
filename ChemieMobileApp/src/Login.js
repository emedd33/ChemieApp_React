import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class Login extends React.Component{
  render(){
    return (
      <View style={styles.loginContainer}>
        <Image
          resizeMode='contain'
          style={styles.logo}
          source={require('./hclogo.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({

    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {

        width: 300,
        height: 150
    },
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    }
});
