import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class EventFormRegistered extends React.Component{
  constructor(props){
    super(props);
    this.state = props.eventState;
  }
render(){
  return(
    <View style={styles.container}>

      <Text>EventFormRegistered</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },

});
