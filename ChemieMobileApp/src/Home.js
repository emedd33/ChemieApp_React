import React from 'react';
import {View, Text, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';


export default class Login extends React.Component{
  render(){
    return (
      <View style={styles.conatiner}>
        <Text>Hello Home app</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    },

});
