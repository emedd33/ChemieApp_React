import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class NotificationScreen extends React.Component{
  static navigationOptions = {
    title: 'Notifications',
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

      <Text>NotificationScreen</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },

});
