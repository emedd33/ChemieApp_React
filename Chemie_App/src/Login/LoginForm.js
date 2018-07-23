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



const fetch_url = 'http://192.168.1.101:8000/api/api-auth/';

export default class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.loginHTTPRequest = this.loginHTTPRequest.bind(this);
    this.state = {
      username: '',
      password:'',
      respons:'',
      error:null,
      loading: false,
      }
    }

    // TODO: Make loginHTTPRequest a general fuction
    loginHTTPRequest(){
      // TODO: Set timer for request
      // TODO: give toast massage for respons
      // TODO: prevent multiple request if server is not up
      // TODO: save username and prefferences.
      if(this.state.username != '' && this.state.password != ''){
        this.setState({
          loading:true,
          });

        fetch(fetch_url,{
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

        if (response.status >= 200 && response.status < 300) {
          // TODO:  Extract token from respons and store it with AsyncStorr

          console.log(response);
          AsyncStorage.setItem('AuthToken', 'e35e316a74d8d8833f4174189af183e70958ec30');
          this.props.navigation.navigate('Home');
        } else if (response.status == 400) {
          Alert.alert("Ups!","Feil brukernavn eller passord");
        } else {
          throw response.status
        }
        })
        .catch((error) => {
          this.setState({
            loading:false,
          });
          Alert.alert("Ups! Feil ved innlogging","Det har skjedd en feil med feilmelding: " + error);
        });
       }

    }


  render(){

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
      flex:1,

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
    },
    submitContainer:{
      marginRight:20,
      marginLeft:20,
      marginTop:10,
      paddingTop:20,
      paddingBottom:20,
      backgroundColor:'#F9CF00',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#F9CF00',
    },
    submitText:{
      color:'black',
      textAlign:'center',
    },
});
