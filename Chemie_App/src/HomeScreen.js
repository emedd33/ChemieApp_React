import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import SladderForm from './SladderForm';



export default class HomeScreen extends React.Component{
  static navigationOptions = {
    title: 'Home',
    header: null,
  };
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <TouchableOpacity style={styles.navigationButtons}>
            <Text>Sladreboks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationButtons}>
            <Text>Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationButtons}>
            <Text>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationButtons}>
            <Text>Events</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
          container:{
            flex:1
    },
    navigationButtons:{

    },
    homeContainer:{
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
    },
});
