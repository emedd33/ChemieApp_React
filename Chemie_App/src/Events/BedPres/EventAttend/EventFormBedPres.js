import React from 'react';
import * as Progress from 'react-native-progress';

import HttpRequest from 'Chemie_App/src/Functions/HttpRequests';

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

import base_params from 'Chemie_App/Params.js';
import EventFormRegistered from './EventFormRegistered';
import EventFormSubmit from './EventFormSubmit';

const bedpres_url = base_params.base_url.concat('/api/events/bedpres/register/');
const bedpres_register_url = base_params.base_url.concat('/api/events/bedpres/register/post/');

export default class EventFormBedPres extends React.Component{

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



      registered_status:false,
      registered:false,



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
    fetch_url = bedpres_url.concat(this.state.event_id);

    // fetching data from url to see if user is registered or not
    let jsonResponse = await HttpRequest.GetRequest(fetch_url);
    let httpStatus = jsonResponse.httpStatus;

    //extracting the response from a inner layour to increase readability
    jsonResponse= jsonResponse.response;

    // 401 means token is not valid and user is forced to log out.
    if (httpStatus == 401){
      AsyncStorage.removeItem('AuthToken');;
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        event:jsonResponse,
        httpStatus:httpStatus
      })

      // a succesful GET-request satiesfies this confition
      if (this.state.httpStatus >= 200 && this.state.httpStatus < 300){

        /*
        The Response from the GET-request gives an emty array if user is not registered
        if the length if the array is 1, then the user must be registred
        in the RESTAPI the user is determined by the unique auth token thus
        only two options of array length, 1 or 0.
        */
        if (jsonResponse.length==1){

          this.setState({
            registered:true,
            registered_status:jsonResponse[0].status,
          });

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
      let fetch_url = '';
      fetch_url = bedpres_register_url.concat(this.state.event_id);
      fetch_url = fetch_url.concat('/');

      let token = await AsyncStorage.getItem('AuthToken');

      if (this.state.companionName == ''){
        this.setState({
          companionName:null,
        });
      }
      // Posting to the website with prefferences.
      let jsonResponse = await fetch(fetch_url,{
        method:'POST',
        headers:{
          "Authorization": token,
          Accept: "application/json",
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          event:this.state.event_id,
          // TODO: Check that status i 1 or must be waiting
          status:1,
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

        // 401 means token is not valid and user is forced to log out.
        if (this.state.httpStatus == 401){
          AsyncStorage.removeItem('AuthToken');;
          this.props.navigation.navigate('Login');
        } else {
          // Valid POST-request.
          if (this.state.httpStatus > 200 && this.state.httpStatus <= 300){
            this.setState({
              registered:true
            })
            //refreshing page
            this.setParameters();
          } else {
            Alert.alert("Ups", "det skjedde en feil: " + this.responseText);
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
