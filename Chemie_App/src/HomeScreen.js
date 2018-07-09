import React from 'react';
import {View, Text, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';

import SladderForm from './SladderForm';

export default class HomeScreen extends React.Component{
  static navigationOptions = {
    title: 'Home',
    header: null,
  };
  render(){
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.homeContainer}>
          <Text>Home View</Text>
        </View>
        <View style={styles.formConatiner}>

          <SladderForm/>

        </View>
      </KeyboardAvoidingView>
      );
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1
    },
    homeContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    
});
