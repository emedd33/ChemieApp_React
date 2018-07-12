import React from 'react';
import {View,Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

import {createStackNavigator} from 'react-navigation';

//{/*() => {this.props.navigation.navigate('Home')}*/}

export default class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.loginCheck = this.loginCheck.bind(this);
    this.state = {
      username: '',
      password:'',
      }
    }
  loginCheck(){
    if (this.state.username == ''&& this.state.password == ''){
        console.log('success');
        //TODO: Add post request to get auth token

        this.props.navigation.navigate('Home');
    } else{
      console.log('failure');
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
        >
          <Text
            style={styles.buttonText}
            onPress={this.loginCheck}
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
  }

});
