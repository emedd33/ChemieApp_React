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

const BEDPRES_URL = base_params.base_url.concat('/api/events/bedpres/register/');
const BEDPRES_REGISTER_URL = base_params.base_url.concat('/api/events/bedpres/register/post/');

export default class EventFormBedPres extends React.Component{


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
      const FETCH_URL = BEDPRES_URL.concat(this.state.event_id);

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

            this.setState({
              registered:true,
              registered_status:response.status,
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
        let FETCH_URL = BEDPRES_REGISTER_URL.concat(this.state.event_id).concat("/");
        
        if (this.state.companionName == ''){
          this.setState({
            companionName:null,
          });
        }

        let body = {
          event:this.state.event_id,
          // TODO: Check that status i 1 or must be waiting
          status:1,
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
