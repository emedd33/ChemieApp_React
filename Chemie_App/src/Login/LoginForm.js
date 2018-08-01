import React from 'react';
//import { Permissions, Notifications } from 'expo';

import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import {createStackNavigator} from 'react-navigation';

import * as Progress from 'react-native-progress';

import base_params from 'Chemie_App/Params.js';
const fetch_url = base_params.base_url.concat('/api/api-auth/');
const fetch_profile_url = base_params.base_url.concat('/api/profile/profile/');
const fetch_push_notification_token =  base_params.base_url.concat('/api/profile/profile/token/');

export default class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.loginHTTPRequest = this.loginHTTPRequest.bind(this);
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
    this.state = {
      username: '',
      password:'',
      httpStatus: null,
      loading: false,
      }
    }
    getProfileSettingsHTTPrequest = async(AuthToken) =>{
      console.log(AuthToken);
      let jsonResponse = await fetch(fetch_profile_url,{
        method:'GET',
        headers:{
          "Authorization": AuthToken,
        },
      })
        .then((response) => {
          this.setState({
            httpStatus:response.status,
          })
          return response.text();
        })
        .then((responseJson)  => {
          let res = JSON.parse(responseJson);
          return res[0];
        })
        .catch((error) => {
           console.error(error);
        });


        AsyncStorage.setItem('AuthToken',AuthToken);
        AsyncStorage.setItem('Firstname',jsonResponse.first_name);
        AsyncStorage.setItem('Lastname',jsonResponse.last_name);
        AsyncStorage.setItem('access_card',jsonResponse.profile.access_card);
        AsyncStorage.setItem('grade',String(jsonResponse.profile.grade));
        AsyncStorage.setItem('membership',jsonResponse.profile.membership);
        AsyncStorage.setItem('username',jsonResponse.username);
        AsyncStorage.setItem('id',String(jsonResponse.id));


        //this.registerForPushNotificationsAsync();

        this.setState({
          loading:false,
        });

        this.props.navigation.navigate('Home');
    }
    // TODO: Make loginHTTPRequest a general fuction
    loginHTTPRequest = async() => {
      // TODO: Set timer for request
      // TODO: give toast massage for respons
      // TODO: prevent multiple request if server is not up
      if(this.state.username != 'kk' && this.state.password != 'kk'){
        this.setState({
          loading:true,
          });

        await fetch(fetch_url,{
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type': 'application/json',
            credentials: 'same-origin',
            mode: 'same-origin',
          },
          timeout: 2000,
          body: JSON.stringify({
            username:this.state.username,
            password:this.state.password,
          }),
        })

        .then((response)=>{
          this.setState({
            httpStatus:response.status,
          })
          return response.text()
        })
        .then((responseJson)  => {

          if (this.state.httpStatus >= 200 && this.state.httpStatus < 300) {

            let AuthTokenObject = JSON.parse(responseJson)
            let AuthToken = "token " + AuthTokenObject.token

            //
            this.getProfileSettingsHTTPrequest(AuthToken);

            //AsyncStorage.setItem('AuthToken', token);
            //
          } else if (this.state.httpStatus == 400) {
            this.setState({
              loading:false,
              });
            Alert.alert("Ups!","Feil brukernavn eller passord");
          } else {
            this.setState({
              loading:false,
              });
            throw this.state.httpStatus
          }
        })
        .catch((error) => {
          Alert.alert("Ups! Feil ved innlogging","Det har skjedd en feil med feilmelding: " + error);
        });


       }

    }
    registerForPushNotificationsAsync =  async() => {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      console.log(finalStatus);

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }

      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      return fetch(fetch_push_notification_token, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:AuthToken
        },
        body: JSON.stringify({
          expo_token:expoToken,
          }),
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
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

        <View style={styles.loginFormContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize = 'none'
            autoCorrect={false}
            returnKeyType='next'
            placeholder = 'Username'
            placeholderTextColor="#707070"
            underlineColorAndroid="transparent"
            onChangeText={(text)=> this.setState({username:text})}
          />
          <TextInput
            style={styles.input}
            autoCapitalize = 'none'
            autoCorrect={false}
            returnKeyType='go'
            placeholder = 'Password'
            placeholderTextColor="#707070"
            secureTextEntry
            underlineColorAndroid="transparent"
            onChangeText={(text)=> this.setState({password:text})}
          />
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={this.loginHTTPRequest}
          >
            <Text style={styles.submitText}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1
    },
    loginFormContainer:{
      flex:2,
      justifyContent:'center',
      alignItems:'center',

    },
    input: {
      height:50,
      backgroundColor: '#d1d1d1',
      color: 'black',
      marginTop: 10,
      marginLeft:10,
      marginRight:10,
      padding: 10,
      borderRadius:10,
      borderWidth: 1,
      borderColor:'#d1d1d1',
      alignSelf: 'stretch',
    },
    submitContainer:{
      marginRight:20,
      marginLeft:20,
      marginTop:10,
      alignSelf: 'stretch',
      backgroundColor:'#F9CF00',
      borderRadius:10,
      height:50,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#F9CF00',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 2,
    },
    submitText:{
      color:'black',
      textAlign:'center',
    },
    loadingContainer:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:50,
    }
});
