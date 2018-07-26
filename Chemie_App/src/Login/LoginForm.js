import React from 'react';
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

const fetch_url = 'http://192.168.1.101:8000/api/api-auth/';
const fetch_profile_url = 'http://192.168.1.101:8000/api/profile/profile/'

export default class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.loginHTTPRequest = this.loginHTTPRequest.bind(this);
    this.getProfileSettingsHTTPrequest = this.getProfileSettingsHTTPrequest.bind(this);
    this.state = {
      username: '',
      password:'',
      httpStatus: null,
      loading: false,
      }
    }
    getProfileSettingsHTTPrequest = async(token) =>{
      let jsonResponse = await fetch(fetch_profile_url,{
        method:'GET',
        headers:{
          "Authorization": token,
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
          console.log(res);
          return res[0];
        })
        .catch((error) => {
           console.error(error);
        });
        AsyncStorage.setItem('AuthToken',token);
        AsyncStorage.setItem('Firstname',jsonResponse.first_name);
        AsyncStorage.setItem('Lastname',jsonResponse.last_name);
        AsyncStorage.setItem('access_card',jsonResponse.profile.access_card);
        AsyncStorage.setItem('grade',String(jsonResponse.profile.grade));
        AsyncStorage.setItem('membership',jsonResponse.profile.membership);
        AsyncStorage.setItem('username',jsonResponse.username);
        AsyncStorage.setItem('id',String(jsonResponse.id));

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
      // TODO: save username and prefferences.
      if(this.state.username != '' && this.state.password != ''){
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
            username:'emedd33',
            password:'123qweasd',
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

            let tokenObject = JSON.parse(responseJson)
            let token = "token " + tokenObject.token

            //
            this.getProfileSettingsHTTPrequest(token);

            //AsyncStorage.setItem('AuthToken', token);
            //
          } else if (this.state.httpStatus == 400) {
            Alert.alert("Ups!","Feil brukernavn eller passord");
          } else {
            throw this.state.httpStatus
          }
        })
        .catch((error) => {
          Alert.alert("Ups! Feil ved innlogging","Det har skjedd en feil med feilmelding: " + error);
        });

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
