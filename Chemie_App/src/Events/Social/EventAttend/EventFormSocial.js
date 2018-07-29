import React from 'react';
import * as Progress from 'react-native-progress';

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
} from 'react-native';

import base_params from 'Chemie_App/Params.js';
import EventFormRegistered from './EventFormRegistered';
import EventFormSubmit from './EventFormSubmit';

const social_url = base_params.base_url.concat('/api/events/social/register/');
const social_register_url = base_params.base_url.concat('/api/events/social/register/post/');

const bedpres_url = base_params.base_url.concat('/api/events/bedpres/register/');
const bedpres_register_url = base_params.base_url.concat('/api/events/bedpres/register/post/');

export default class EventFormSocial extends React.Component{

  constructor(props){
    super(props);
    this.state={
      loading:true,

      register_open:props.eventState.register_open,
      register_open_date:props.eventState.register_open_date,
      register_closed:props.eventState.register_closed,
      register_closed_date:props.eventState.register_closed_date,
      register_deadline_date:props.eventState.register_deadline_date,

      event_type:props.eventState.type,
      event_id:props.eventState.event_id,

      AuthToken:props.eventState.AuthToken,
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
      payed:false,


    }
    this.getEventStatusFromAPI=this.getEventStatusFromAPI.bind(this);
    this.postEventStatusToAPI = this.postEventStatusToAPI.bind(this);

    this.updateParentState = this.updateParentState.bind(this);

  }
  updateParentState(body){
    this.setState(body);
  }

  componentWillMount(){
    this.getEventStatusFromAPI()
  }

  getEventStatusFromAPI = async() =>{


    let fetch_url = '';
    if (this.state.event_type =="Social"){
      fetch_url = social_url.concat(this.state.event_id);
    } else if (this.state.event_type =="BedPres") {
      fetch_url = bedpres_url.concat(this.state.event_id);
    }

    let jsonResponse = await fetch(fetch_url,{
      method:'GET',
      headers:{
        "Authorization": this.state.AuthToken,
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

        return res;
      })
      .catch((error) => {
         console.error(error);
      });
      if (this.state.httpStatus >= 200 && this.state.httpStatus < 300){
        if (jsonResponse.length==1){
          this.setState({
            registered:true,
            registered_status:jsonResponse[0].status,
            payed:jsonResponse[0].payment_status,
            sleepover_checked:jsonResponse[0].sleepover,
            snack_checked:jsonResponse[0].night_snack,
          });
          if (jsonResponse[0].companion != null && jsonResponse[0].companion != ''){
            this.setState({

              companionName:jsonResponse[0].companion,
              companionNamePlaceholder:jsonResponse[0].companion,
            })
          }
        }

        this.setState({loading:false});

      }
  }
  postEventStatusToAPI = async() => {
      this.setState({loading:true});
      let fetch_url = '';
      if (this.state.event_type =="Social"){
        fetch_url = social_register_url.concat(this.state.event_id);
      } else if (this.state.event_type =="BedPres") {
        fetch_url = bedpres_register_url.concat(this.state.event_id);
      }
      fetch_url = fetch_url.concat('/');
      if (this.state.companionName == ''){
        this.setState({
          companionName:null,
        });
      }

      let jsonResponse = await fetch(fetch_url,{
        method:'POST',
        headers:{
          "Authorization": this.state.AuthToken,
          Accept: "application/json",
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          event:this.state.event_id,
          // TODO: Check that status i 1 or must be waiting
          status:1,
          sleepover:this.state.sleepover_checked,
          night_snack:this.state.snack_checked,
          companion:this.state.companionName,
        })
      })
        .then((response) => {
          console.log(response);
            this.setState({
            response:response,
            httpStatus:response.status,
            responseText:response.statusText,
          })
          return response.text();
        })
        .then((responseJson)  => {
          let res = JSON.parse(responseJson);
          return res;
        })
        .catch((error) => {
           console.error(error);
           Alert.alert("Ups", "det har skjedd en feil: " + error);
        });

        if (this.state.httpStatus < 200 || this.state.httpStatus >= 300){
          Alert.alert("Ups", "det skjedde en feil: " + this.responseText);
        }
        this.getEventStatusFromAPI();
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
    return(
      <EventFormRegistered eventState={this.state} getEventStatusFromAPI = {this.getEventStatusFromAPI}/>
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
