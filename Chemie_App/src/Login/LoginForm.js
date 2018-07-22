import React from 'react';
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {createStackNavigator} from 'react-navigation';



const fetch_url = 'http://192.168.0.17:8000/api/api-auth/';

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
          }
        })
        .then((response)=>{
          this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          this.setState({
            loading:false,
          });
          alert(error);
        });
       }

    }


  render(){

    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          autoCapitalize = 'none'
          autoCorrect={false}
          returnKeyType='next'
          placeholder = 'Username'
          placeholderTextColor="#707070"
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
          onChangeText={(text)=> this.setState({password:text})}
        />
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={this.loginHTTPRequest}
        >
          <Text
            style={styles.submitText}
          >
            LOGIN
          </Text>

        </TouchableOpacity>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    },
  input: {
    height:60,
    backgroundColor: '#d1d1d1',
    color: 'black',
    marginBottom: 10,
    padding: 10,
  },
  submitContainer:{
    marginRight:20,
    marginLeft:20,
    marginTop:10,
    marginBottom:10,
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
