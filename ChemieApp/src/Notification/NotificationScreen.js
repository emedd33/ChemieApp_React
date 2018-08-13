import React from 'react';
import * as Progress from 'react-native-progress';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

import httpRequests from 'ChemieApp/src/Functions/HttpRequests'
import base_params from 'ChemieApp/Params.js';
const FETCH_PUSH_URL = base_params.base_url.concat("/api/pushnotification/submission/");

export default class NotificationScreen extends React.Component{
  static navigationOptions = {
    title: 'Notifications',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
    };
  constructor(props){
    super(props);
    this.state={
      loading:false,
      sendCoffee:false,
      sendVaffler: false,
      sendGoodies: false,
      profile:props.navigation.state.params.profile,
      authToken:props.navigation.state.params.authToken,
    }
    this.sendNotificationHttpRequest = this.sendNotificationHttpRequest.bind(this);
  }
  sendNotificationHttpRequest = async() =>{
      if (!this.state.sendCoffee && !this.state.sendVaffler && !this.state.sendGoodies){
        Alert.alert("Ups", "Du må minst velge et alternativ")
      } else {
        this.setState({loading:true})
        let body = {
          coffee:this.state.sendCoffee,
          vaffler:this.state.sendVaffler,
          goodies:this.state.sendGoodies,
        }
        let jsonResponse = await httpRequests.PostRequest(FETCH_PUSH_URL, body, this.state.authToken)
        if (jsonResponse.httpStatus >= 200 && jsonResponse.httpStatus < 300){
          Alert.alert("suksess", "Så snill du er som sier ifra til andre");
        }
        this.setState({loading:false})
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
  return(
    <View style={styles.container}>

      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{textAlign:'center', fontSize:15}}>
          Her kan du seende push-vasler til andre om kaffe/vaffler/godsaker på kontoret.
        </Text>
      </View>
      <View style={{flex:2}}>
        <View style={styles.switchWhiteContainer}>
          <Switch
            value={this.state.sendCoffee}
            style={{marginLeft:10}}
            onValueChange={()=>{this.setState({
              sendCoffee:!this.state.sendCoffee
            })}}
          />
          <Text style={{fontWeight:'bold'}}>
            Kaffe
          </Text>
        </View>
        <View style={styles.switchGrayContainer}>
          <Switch
            value={this.state.sendVaffler}
            style={{marginLeft:10}}
            onValueChange={()=>{this.setState({
              sendVaffler:!this.state.sendVaffler
            })}}
          />
          <Text style={{fontWeight:'bold'}}>
            Vaffler
          </Text>
        </View>
        <View style={styles.switchWhiteContainer}>
          <Switch
            value={this.state.sendGoodies}
            style={{marginLeft:10}}
            onValueChange={()=>{this.setState({
              sendGoodies:!this.state.sendGoodies
            })}}
          />
          <Text style={{fontWeight:'bold'}}>
            Andre godsaker
          </Text>
        </View>
      </View>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={this.sendNotificationHttpRequest}
        >
          <Text style={styles.submitText}>
            Send push notification
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  switchGrayContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },
  switchWhiteContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'ghostwhite',

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
  loadingContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
  }

});
