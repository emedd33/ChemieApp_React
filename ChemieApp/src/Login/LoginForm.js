import React from 'react';
import * as Progress from 'react-native-progress';

import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  Image,

} from 'react-native';

import httpRequests from 'ChemieApp/src/Functions/HttpRequests'
import base_params from 'ChemieApp/Params.js';
const FETCH_PROFILE_URL = base_params.base_url.concat('/api/profile/profile/');

export default class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.loginHTTPRequest = this.loginHTTPRequest.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this.state = {
      username: '',
      password:'',
      httpStatus: null,
      loading: false,
      profile:null,
      keyboardShown:false,
      authToken:null,
      }
    }
  //Addings listener to when user presses TextInput
  componentDidMount () {
     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  //Removing listener for textinput press
  componentWillUnmount () {
     this.keyboardDidShowListener.remove();
     this.keyboardDidHideListener.remove();
   }

   //Removing HC-logo when Keyboard is shown
  _keyboardDidShow () {
     this.setState({
       keyboardShown:true,
     });
   }

   //re-renders HC-logo when keyboard is hidden
  _keyboardDidHide () {
     this.setState({
       keyboardShown:false,
     })
   }

  loginHTTPRequest = async() => {
    //If user has edited both fields
    if(this.state.username != '' && this.state.password != ''){
        try{
          this.setState({
            loading:true,
          });

          //Fetching response from website by function in httpRequests
          let responseState = await httpRequests.PostLoginRequest(this.state.username, this.state.password);

          //Success
          if (responseState.httpStatus >= 200 && responseState.httpStatus < 300) {
              //Combining the token string with "token" to create the AuthToken
              let authToken = "token " + responseState.response.token;

              // Requesting profile settings from website
              this.getProfileSettingsHTTPrequest(authToken);
              }
          // password and username is not correct
          else if (responseState.httpStatus == 400) {
              Alert.alert("Ups!","Feil brukernavn eller passord");
            }
          //if httpstatus is something else: throw the error or the http status
          else if (responseState.httpStatus != null){
              throw responseState.httpStatus
            } else {
              throw responseState.error
            }
          }
          //Catching errors from httprequest and alert user
          catch(error) {
            Alert.alert("Ups! Feil ved innlogging","Det har skjedd en feil med feilmelding: " + error);
          }
          this.setState({
            loading:false,
          });
      }
    }
  getProfileSettingsHTTPrequest = async(authToken) =>{

      //fetching userprofile from website by HttpRequests
      let httpResponse = await httpRequests.GetRequest(FETCH_PROFILE_URL, authToken)

      //extracting profile from response
      profile = httpResponse.response[0];

      //Store the user profile in AsyncStorage so it's already loaded when the app is re-started
      AsyncStorage.setItem('isAuthenticated', JSON.stringify(true));
      AsyncStorage.setItem('AuthToken',authToken);
      AsyncStorage.setItem('firstname',profile.first_name);
      AsyncStorage.setItem('lastname',profile.last_name);
      AsyncStorage.setItem('access_card',profile.profile.access_card);
      AsyncStorage.setItem('grade',String(profile.profile.grade));
      AsyncStorage.setItem('username',profile.username);
      AsyncStorage.setItem('id',String(profile.id));
      profileState = {
        id:profile.id,
        username:profile.username,
        firstname:profile.first_name,
        lastname:profile.last_name,
        access_card:profile.profile.access_card,
        grade:profile.profile.grade,
      }
      this.setState({
        loading:false,
        profile:profileState,
        authToken:authToken
      });
      this.props.navigation.navigate('Home',{
        profile:this.state.profile,
        authToken:this.state.authToken,
      });
    }
    // TODO: Make loginHTTPRequest a general fuction
  render(){
    if(this.state.loading){
      // TODO: This needs to be chacked to IOS, https://github.com/oblador/react-native-progress
      return(
        <View style={styles.loadingContainer}>
          <Progress.Circle size={80} indeterminate={true} color="black" />
        </View>
      );
    }

    // setting visibility of image to on and of depending if keyboard is shown.
    let image = <Image
      resizeMode='contain'
      style={styles.logo}
      source={require('./images/hclogo.png')} />
    if (this.state.keyboardShown){
      image = <Text></Text>
    }

    return (
      <View style={styles.container}>
        <View style={styles.loginFormContainer} behavior="padding">
          <View style={styles.loginImageContainer}>
            {image}
          </View>
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

      </View>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:3
    },
    loginFormContainer:{
      flex:2,
      justifyContent:'center',
      alignItems:'center',
    },
    loginImageContainer:{
        alignItems: 'center',
        flex: 3,
        justifyContent: 'center',
    },
    logo: {
        width: 300,
        height: 150,
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
