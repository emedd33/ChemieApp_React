import React from 'react';
import {View,Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

import {createStackNavigator} from 'react-navigation';

//{/*() => {this.props.navigation.navigate('Home')}*/}

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
    loginHTTPRequest(){
      if(this.state.username == '' && this.state.password == ''){
        this.setState({
          loading:true,
          });
        //console.log(this.state.username + this.state.password);
        fetch(fetch_url,{
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            username:'emedd33',
            password:'123qweasd',
          }),
        })

        .then((res)=>{
          //TODO: extract token from respons
          this.setState({
            respons:res,
            loading:false,
          });
          this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            error:error,
            loading:false,
          });
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
          placeholder = 'Brukernavn'
          onChangeText={(text)=> this.setState({username:text})}
        />
        <TextInput
          style={styles.input}
          autoCapitalize = 'none'
          //ref={(input)=> this.passwordInput = input}
          autoCorrect={false}
          returnKeyType='go'
          placeholder = 'Passord'
          secureTextEntry
          onChangeText={(text)=> this.setState({password:text})}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.loginHTTPRequest}
        >
          <Text
            style={styles.buttonText}
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
  buttonContainer:{
    backgroundColor:'#F9CF00',
    paddingVertical: 15,
    },
  buttonText:{
    color: 'black',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom:20,
  }

});
