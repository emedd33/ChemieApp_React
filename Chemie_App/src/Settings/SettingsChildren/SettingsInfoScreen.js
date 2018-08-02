import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class SettingsInfoScreen extends React.Component{
  static navigationOptions = {
    title: 'Info',
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

      <Text>SettingsInfoScreen</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },

});
