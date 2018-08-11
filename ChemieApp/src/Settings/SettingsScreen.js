import React from 'react';
import * as Progress from 'react-native-progress';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Switch,
  Image,
} from 'react-native';

export default class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profile:props.navigation.state.params.profile,
      authToken:props.navigation.state.params.authToken,
    }
  }
  static navigationOptions = {
    title: 'Innstillinger',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
  };


  render(){
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>

        </View>
        <TouchableOpacity style={styles.greyNavigation}
          onPress={()=>this.props.navigation.navigate('SettingsGeneral',{
            state:this.state,
          })}
        >
          <Text style={{ marginLeft:20}}>Generelt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteNavigation}
          onPress={()=>this.props.navigation.navigate('SettingsPushNotification',{
            state:this.state,
          })}
        >
          <Text style={{ marginLeft:20}}>Push notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greyNavigation}
          onPress={()=>this.props.navigation.navigate('SettingsEmail')}
        >
          <Text style={{ marginLeft:20}}>E-poster til kommiteer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteNavigation}
          onPress={()=>this.props.navigation.navigate('SettingsInfo')}
        >
          <Text style={{ marginLeft:20}}>Info</Text>
        </TouchableOpacity>



      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  SettingsLogo:{
    width:70,
    height:70,
  },
  imageContainer:{
    flexDirection:'row',
    height:100,
    alignItems:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'ghostwhite',
  },
  infoContainer:{
    flex:2,
    alignItems:'center',
  },
  whiteNavigation:{
      height:50,
      backgroundColor:'ghostwhite',
      justifyContent:'center',
  },
  greyNavigation:{
    height:50,
    justifyContent:'center',
  },

});
