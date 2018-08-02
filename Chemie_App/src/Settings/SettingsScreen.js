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
} from 'react-native';

export default class LoginScreen extends React.Component{
  constructor(props){
    super(props);

    this.getProfileSettings = this.getProfileSettings.bind(this);
    this.changePushNotificationSettings = this.changePushNotificationSettings.bind(this);
    this.state = {
      loading:true,
      firstname:"",
      lastname:"",
      access_card:"",
      membership:"",
      pushNotification:false,
    }
  }
  static navigationOptions = {
    title: 'Innstillinger',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
  };
  componentWillMount(){
    this.getProfileSettings();
  }
  changePushNotificationSettings = async()=>{

        this.setState({
          //loading:true,
          pushNotification:!this.state.pushNotification,
        })

      }

  getProfileSettings = async() =>{
    let AuthToken ="";
    let firstname = "";
    let lastname = "";
    let access_card = "";
    let membership = "";
    try{
      firstname = await AsyncStorage.getItem('Firstname');
      firstname = firstname.concat(" ");
      lastname = await AsyncStorage.getItem('Lastname');
      access_card = await AsyncStorage.getItem('access_card');
      membership = await AsyncStorage.getItem('membership');
      //let pushNotification = await AsyncStorage.getItem('pushNotification');
    } catch (error){
      Alert.alert("Ups", "Klarte ikke å hente profilen din")
    }
    this.setState({
      loading:false,
      AuthToken:AuthToken,
      firstname:firstname,
      lastname:lastname,
      access_card:access_card,
      membership:membership,
      //pushNotification:false,
    });

  }

  render(){
    if(this.state.loading){
      // TODO: This needs to be chacked to IOS, https://github.com/oblador/react-native-progress
      return(
        <View style={styles.loadingContainer}>
          <Progress.Circle size={80} indeterminate={true} color="black" />
        </View>
      );
    }
    let firstname = <Text style={{fontSize:20}}>{this.state.firstname}</Text>
    let lastname = <Text style={{fontSize:20}}>{this.state.lastname}</Text>
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          {firstname}
          {lastname}
        </View>
        <TouchableOpacity style={styles.whiteNavigation}
          onPress={()=>this.props.navigation.navigate('SettingsGeneral',{
            state:this.state,
          })}
        >
          <Text style={{ marginLeft:20}}>Generelt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greyNavigation}
          onPress={()=>this.props.navigation.navigate('SettingsPushNotification')}
        >
          <Text style={{ marginLeft:20}}>Push notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteNavigation}
          onPress={()=>this.props.navigation.navigate('SettingsEmail')}
        >
          <Text style={{ marginLeft:20}}>E-poster til kommiteer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greyNavigation}
          onPress={()=>this.props.navigation.navigate('SettingsInfo')}
        >
          <Text style={{ marginLeft:20}}>info</Text>
        </TouchableOpacity>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  loadingContainer:{
    marginTop:50,
    justifyContent:'center',
    alignItems:'center',
  },
  nameContainer:{
    flexDirection:'row',
    height:70,
    alignItems:'center',
    alignItems:'center',
    justifyContent:'center'
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
