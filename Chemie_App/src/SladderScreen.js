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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            SladderScreen
          </Text>
        </View>
        <SladderForm/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    titleContainer:{
      backgroundColor: 'powderblue',
      flex: 1,
      alignItems:'center',
      justifyContent: 'center',
    },
    titleText:{

    },
});
