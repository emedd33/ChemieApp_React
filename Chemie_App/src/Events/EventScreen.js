import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class EventScreen extends React.Component{
  static navigationOptions = {
    title: 'Events',
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
      <Text>EventScreen</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
