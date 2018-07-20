import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import SladderForm from './SladderForm';


export default class SladderScreen extends React.Component{
  static navigationOptions = {
    title: 'Sladder',
    header: null,
  };
  componentDidMount(){
    console.log('SladderScreen componentDidMount');
  }
  render(){
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.sladderConatainer} behavior='padding'>
          <Text>Sladder Screen</Text>
          <SladderForm/>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
      flex:1
    },
    sladderConatainer:{
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
    }
});
