import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class EventAttendScreen extends React.Component{
  static navigationOptions = {
    title: 'EventAttend',
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

      <Text>EventAttendScreen</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },

});
