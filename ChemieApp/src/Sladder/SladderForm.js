import React from 'react';
import * as Progress from 'react-native-progress';
import ImgToBase64 from 'react-native-image-base64';

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
  Image,

} from 'react-native';

import UploadImage from './UploadImage';
import httpRequests from 'ChemieApp/src/Functions/HttpRequests';
import clearAsyncStorage from 'ChemieApp/src/Functions/clearAsyncStorage';

import base_params from 'ChemieApp/Params.js';
const FETCH_URL = base_params.base_url.concat('/api/sladreboks/submission/');

export default class SladderForm extends React.Component{
constructor(props){
    super(props);
    this.sendSladder = this.sendSladder.bind(this);

    this.state = {
      loading: false,
      sladderText: '',
      authToken: props.authToken,
      httpStatus: null,
      image:null,
      uploadingImage:false,
      body:null,
    }
  }
  updateState (data) {
        this.setState(data);
  }

  sendSladder = async() =>{
    if(this.state.sladderText != '' || this.state.image != null){
      this.setState({
        loading:true
      });
      let body = {content:this.state.sladderText}
      if (this.state.image != null){
        console.log("image:",this.state.image);
        // TODO: convert image to base64
        body = {content:this.state.sladderText}
      }

      let response = await httpRequests.PostRequest(FETCH_URL, body, this.state.authToken)

     if (response.httpStatus == 401){
       clearAsyncStorage.clearAll();
     }
     else if (response.httpStatus < 300 && response.httpStatus >= 200){
       Alert.alert("Sladder sent!", "Sugepumpa takker deg");
     }
     else if (response.error != null){
       Alert.alert(
       "Noe gikk galt",
       "error: " + response.error);
     }
     }
     else {
       Alert.alert(
       "Noe gikk galt",
       "http Status: " + response.httpStatus);
     }
     this.setState({
       loading:false,
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
    return(
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <TextInput
          // TODO: max length 2000 on text input
          style={styles.sladderInput}
          multiline={true}
          numberOfLines={10}
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
        <UploadImage updateParentState={this.updateState.bind(this)}/>
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
      marginBottom:10,
    },
    sladderSubmit:{
      backgroundColor:'#F9CF00',
      alignSelf: 'stretch',
      height:50,
      marginLeft:50,
      marginRight:50,
      borderRadius:10,
      marginBottom:10,
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
