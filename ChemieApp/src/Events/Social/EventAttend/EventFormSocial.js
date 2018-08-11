import React from 'react';
import * as Progress from 'react-native-progress';

import HttpRequest from 'ChemieApp/src/Functions/HttpRequests';

import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';

import base_params from 'ChemieApp/Params.js';
import EventFormRegistered from './EventFormRegistered';
import EventFormSubmit from './EventFormSubmit';

const SOCIAL_URL = base_params.base_url.concat('/api/events/social/register/');
const SOCIAL_REGISTER_URL = base_params.base_url.concat('/api/events/social/register/post/');

export default class EventFormSocial extends React.Component{

  constructor(props){
    super(props);
    this.state={
      loading:true,

      register_open:props.eventState.event_register_open,
      register_closed:props.eventState.event_register_closed,
      deregister_deadline:props.eventState.event_deregister_closed,

      register_open_date:props.eventState.register_open_date,
      register_closed_date:props.eventState.register_closed_date,
      deregister_deadline_date:props.eventState.register_deadline_date,

      event_id:props.eventState.event_id,

      authToken:props.eventState.authToken,
      httpStatus:null,
      response:null,
      responseText:null,

      companion_allowed:props.eventState.event.companion,
      snack_allowed:props.eventState.event.night_snack,
      sleepover_allowed:props.eventState.event.sleepover,

      sleepover_checked:false,
      snack_checked:false,

      companionNamePlaceholder:"Skriv inn navn på følge",
      companionName:null,

      registered_status:false,
      registered:false,
      payment_status:false,
      price_member:null,


    }
    this.setParameters=this.setParameters.bind(this);
    this.postEventStatusToAPI = this.postEventStatusToAPI.bind(this);
    this.updateParentState = this.updateParentState.bind(this);

  }
  componentWillMount(){

    this.setParameters()
  }

  //main function which gets data from HttpRequest
  setParameters = async() =>{
    this.setState({
      loading:true
    })
    const FETCH_URL = SOCIAL_URL.concat(this.state.event_id);

    // fetching data from url to see if user is registered or not
    let jsonResponse = await HttpRequest.GetRequest(FETCH_URL, this.state.authToken);

    // 401 means token is not valid and user is forced to log out.
    if (jsonResponse.httpStatus == 401){
      //AsyncStorage.removeItem('AuthToken');;
      //this.props.navigation.navigate('Login');
    } else {
      this.setState({
        httpStatus:jsonResponse.httpStatus
      })

      // a succesful GET-request satiesfies this confition
      if (jsonResponse.httpStatus >= 200 && jsonResponse.httpStatus < 300){

        /*
        The Response from the GET-request gives an emty array if user is not registered
        if the length if the array is 1, then the user must be registred
        in the RESTAPI the user is determined by the unique auth token thus
        only two options of array length, 1 or 0.
        */
        if (jsonResponse.response.length==1){
          let response = jsonResponse.response[0];
          let payed = jsonResponse.payment_status

          //an event which have 0 kr payment requirement will be set to free.
          if (response.event.price_member + response.event.price_not_member == 0){
            payed = true;
          }

          this.setState({
            registered:true,
            registered_status:response.status,
            payment_status:payed,
            price_member:response.event.price_member,
            sleepover_checked:response.sleepover,
            snack_checked:response.night_snack,
          });

          if (response.companion != null && response.companion != ''){
            this.setState({
              companionName:response.companion,
              companionNamePlaceholder:response.companion,
            })
          }
        }
      }
    }
    this.setState({loading:false});
  }
  updateParentState(body){
    this.setState(body);
  }

  // registration to event
  postEventStatusToAPI = async() => {
      this.setState({loading:true});

      // Formatting the url
      let FETCH_URL = SOCIAL_REGISTER_URL.concat(this.state.event_id).concat("/");

      if (this.state.companionName == ''){
        this.setState({
          companionName:null,
        });
      }
      // Posting to the website with prefferences.
      let body = {
        event:this.state.event_id,
        // TODO: Check that status i 1 or must be waiting
        status:1,
        sleepover:this.state.sleepover_checked,
        night_snack:this.state.snack_checked,
        companion:this.state.companionName,
      }

      let jsonResponse = await HttpRequest.PostRequest(FETCH_URL, body, this.state.authToken);


        // 401 means token is not valid and user is forced to log out.
        if (jsonResponse.httpStatus == 401){
          //AsyncStorage.removeItem('AuthToken');;
          //this.props.navigation.navigate('Login');
        } else {
          // Valid POST-request.
          if (jsonResponse.httpStatus > 200 && jsonResponse.httpStatus <= 300){
            this.setState({
              registered:true
            })
            //refreshing page
            this.setParameters();
          } else {
            Alert.alert("Ups", "det skjedde en feil: " + jsonResponse.httpStatus);
          }
        }
      this.setState({loading:false})
    }
render(){
  if (this.state.registered){
    registerText = <Text>Endre registrasjon</Text>
    switch (this.state.registered_status) {
      case 2:
        registerTextStatus = <Text style={{color:'grey', fontSize:20}}>Du er på venteliste</Text>
        break;
      case 3:
        registerTextStatus = <Text style={{color:'grey', fontSize:20}}>Du viser interesse</Text>
        break;
      default:
        registerTextStatus = <Text style={{color:'green', fontSize:20}}>Du er påmeldt</Text>
    }
    deregistrationButton =
    <TouchableOpacity
      style={styles.submitButton}
      onPress={this.forceUpdateHandler}
    >
      <Text style={{color:'red'}}>Meld meg av</Text>
    </TouchableOpacity>

  }

  if(this.state.loading){
        return(
          <View style={styles.loadingContainer}>
            <Progress.Circle size={80} indeterminate={true} color="black" />
          </View>
        );
  }

  if (this.state.registered){
    console.log(this.state);
    return(
      <EventFormRegistered
        eventState={this.state}
      />
    );
  }
  return(
      <EventFormSubmit
        eventState = {this.state}
        postEventStatusToAPI = {this.postEventStatusToAPI}
        updateParentState = {this.updateParentState}
      />





    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  loadingContainer:{
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
  },
});
