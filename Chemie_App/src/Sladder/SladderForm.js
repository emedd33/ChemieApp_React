import React from 'react';
import * as Progress from 'react-native-progress';

import {
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';


const fetch_url = "http://192.168.1.101:8000/api/sladreboks/submission/"

export default class SladderForm extends React.Component{
constructor(props){
    super(props);
    this.sendSladder = this.sendSladder.bind(this);
    this.checkAuthToken = this.checkAuthToken.bind(this);
    this.state = {
      loading: false,
      sladderText: '',
      AuthToken: 'token ',
      httpStatus: null,
    }
  }
  checkAuthToken = async () => {
    try {
      console.log('SladderForm checkAuthToken');
      this.setState({
        loading:true,
      });
      let token = await AsyncStorage.getItem('AuthToken');
      console.log(token);
      // TODO: Find a better conditions to check if token is correct

          this.setState({
            AuthToken:token,
            loading:false,
      })
    } catch (error) {
      alert(error);
    }


  }
  componentWillMount(){
    console.log('SladderForm componentWillMount');
    this.checkAuthToken();
  }
  componentDidMount(){
    console.log('SladderForm componentDidMount');

  }
  sendSladder = async() =>{
    // TODO: add sendImage
    this.setState({
      loading:true
    });

    if(this.state.sladderText != ''){
      let response = await fetch(fetch_url,{
        method:'POST',
        headers:{
          "Authorization": this.state.AuthToken,
          Accept: "application/json",
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          content:this.state.sladderText,
        }),
      })
      .catch((error) => {
        Alert.alert(
        "Noe gikk galt",
        "Feilmelding: " + error);
     });
     console.log(response);
     this.setState({
       httpStatus:response.status,
     })
     if (this.state.httpStatus < 300 && this.state.httpStatus >= 200){
       Alert.alert("Sladder sent!", "Sugerpumpa takker deg");
     } else {
       Alert.alert(
       "Noe gikk galt",
       "http Status: " + this.state.httpStatus);
     }
     this.setState({
       loading:false,
     });
   }
  }
  render(){
    while(this.state.loading){
      // TODO: This needs to be chacked to IOS, https://github.com/oblador/react-native-progress
      return(
        <View style={styles.loadingContainer}>
          <Progress.Circle size={80} indeterminate={true} color="black" />
        </View>
      );
    }
    return(
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <TextInput
          style={styles.sladderInput}
          multiline={true}
          numberOfLines={2}
          autoCorrect={true}
          autoCapitalize = 'sentences'
          returnKeyType='go'
          placeholder = 'Skriv inn sladder'
          ref={input => { this.textInput = input }}
          onChangeText={(text)=> this.setState({sladderText:text})}

          // TODO: Andriod only, must check IOS
          underlineColorAndroid="transparent"
        >
        </TextInput>
        <TouchableOpacity
          style={styles.sladderSubmit}
          onPress={this.sendSladder}
        >
          <Text>
            Send
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 3,
      alignItems:'center',
      },
    sladderInput:{
      alignSelf: 'stretch',
      backgroundColor:'white',
      height:200,
      textAlignVertical: 'top',
      padding:5,
      borderRadius:10,
      borderWidth: 1,
      margin:10,
      marginBottom:20,
    },
    sladderSubmit:{
      backgroundColor:'#F9CF00',
      alignSelf: 'stretch',
      height:50,
      marginLeft:50,
      marginRight:50,
      borderRadius:10,
      borderWidth: 1,
      borderColor:'#F9CF00',
      alignItems:'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 2,
    },
    loadingContainer:{
      alignItems:'center',
      flex:3
    },

});
