import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Switch,
} from 'react-native';

export default class SettingsPushNotificationScreen extends React.Component{
  static navigationOptions = {
    title: 'Push notification',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
    };
  constructor(props){
    super(props);
    this.state=this.props.navigation.state.params.state;

  }
render(){
  return(
    <View style={styles.container}>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>
          Skru av/på pushvarsler fra ChemieApp
        </Text>
        <Switch
          value={this.state.pushNotification}
          onValueChange={()=>{this.setState({
            pushNotification:!this.state.pushNotification
          })}}
        />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },

});
