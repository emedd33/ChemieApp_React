import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class SettingsGeneralScreen extends React.Component{
  static navigationOptions = {
    title: 'generelt',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
    };
  constructor(props){
    super(props);
  }
render(){
  return(
    <View style={styles.container}>

      <Text>SettingsGeneralScreen</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },

});
