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
    this.logoutPress=this.logoutPress.bind(this);
    this.logoutSubmit=this.logoutSubmit.bind(this);
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
  logoutPress(){

    Alert.alert(
    'Sign out',
    'Sikker på at du vil logge ut?',
    [
      {text: 'Nei', style: 'cancel' },
      {text: 'Ja', onPress: () => {
      this.logoutSubmit()
      .then(this.props.navigation.navigate('Login'))},
      }
    ],
      { cancelable: true }
    );
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
  logoutSubmit = async() => {


    try{
      // TODO: remove other prefferences
      await AsyncStorage.removeItem('AuthToken');
      console.log("logging out");

    } catch (error) {
      alert(error);
      AsyncStorage.clear()
    }
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
          onPress={()=>this.props.navigation.navigate('SettingsGeneral')}
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

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={this.logoutPress}
          >
            <Text
              style={styles.buttonText}
            >Logout</Text>
          </TouchableOpacity>

        </View>
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
  logoutContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'ghostwhite',
  },
  logoutButton:{
    backgroundColor:'red',
    borderRadius:20,
    borderWidth: 1,
    borderColor:"red",
    alignSelf: 'stretch',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    margin:50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText:{
    color:'white',
  }
});
