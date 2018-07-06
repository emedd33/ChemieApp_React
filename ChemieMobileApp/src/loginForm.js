import React from 'react';
import {View,Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default class LoginForm extends React.Component {
  render(){
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCapitalize = 'none'
          autoCorrect={false}
          returnKeyType='next'
          placeholder = 'Brukernavn'
        />
        <TextInput
          style={styles.input}
          autoCapitalize = 'none'
          ref={(input)=> this.passwordInput = input}
          autoCorrect={false}
          returnKeyType='go'
          placeholder = 'Passord'
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          //onPress={onButtonPress}
        >
          <Text style={styles.buttonText}>
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
    flex: 1,
  },
  input: {
    height:50,
    width: 280,
    backgroundColor: 'rgba(225,225,225,0.2)',
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
