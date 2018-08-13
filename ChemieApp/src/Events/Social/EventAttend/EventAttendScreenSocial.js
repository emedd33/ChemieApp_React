import React from 'react';
import * as Progress from 'react-native-progress';

var moment = require('moment'); //time package used to determine ETA and dates.


import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import EventClosed from 'ChemieApp/src/Events/Components/EventClosed';
import EventNotAllowed from 'ChemieApp/src/Events/Components/EventNotAllowed';
import EventFormSocial from './EventFormSocial';

import HttpRequest from 'ChemieApp/src/Functions/HttpRequests';
import timeAndDate from 'ChemieApp/src/Functions/TimeAndDate';
import base_params from 'ChemieApp/Params.js';

export default class EventAttendScreenSocial extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    // sets the title in the header
    title: `${navigation.state.params.event.title}`,
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
  });
  constructor(props){
    //some of the states are fetched from EventAttendScreenSocial
    super(props);
    this.state={
      loading:true,
      event:props.navigation.state.params.event,
      event_id: props.navigation.state.params.event_id,
      profile:props.navigation.state.params.profile,
      authToken:props.navigation.state.params.authToken,
      allowed:true,
      user_registered:false,
      user_payed:false,

      register_open_date:null,
      register_closed_date:null,
      register_deadline_date:null,
      time_until_open:null,

      event_register_open:false,
      event_register_closed:false,
      event_deregister_closed:false,
      componentScreen:"OPEN",
      user_can_register:true,

    }
    this.setParameters = this.setParameters.bind(this);
  }

  componentWillMount(){
    this.setParameters();
  }
  //Main function when loading component.
  setParameters = () =>{

      this.setState({
        loading:true,
      })

      //Formatting dates for readability
      let convertedStrings = timeAndDate.getReadableDateStringsSocialEvents(
        this.state.event.register_startdate,
        this.state.event.register_deadline,
        this.state.event.deregister_deadline
      );

      //checking if user is allowed to register for event
      if (!this.state.event.allowed_grades.includes(Number(this.state.profile.grade))){
        this.setState({
          allowed:false
        });
      }
      let componentScreen = "OPEN";
      let user_can_register = true;
      if (!convertedStrings.event_register_open) {
        componentScreen = "BEFORE_REGISTRATIONS";
        user_can_register=false;
      }
      if (convertedStrings.event_register_open && !convertedStrings.register_deadline_date){
        componentScreen = "AFTER_REGISTRATION";
        user_can_register = false;
      }

      this.setState({
        register_open_date:convertedStrings.register_open_date,
        register_closed_date:convertedStrings.register_deadline_date,
        register_deadline_date:convertedStrings.deregister_deadline_date,

        event_register_open:convertedStrings.event_register_open,
        event_register_closed:convertedStrings.event_register_closed,
        event_deregister_closed:convertedStrings.event_deregister_closed,
        time_until_open:convertedStrings.time_until_open,
        componentScreen:componentScreen,
        user_can_register:user_can_register,

      })
      setTimeout(()=>{
        this.setState({
          loading:false
        })
      },500);

  }

render(){
  
  //Render progress circle if loading
  if (this.state.loading) {
    return(
      <View style={styles.loadingContainer}>
        <Progress.Circle size={80} indeterminate={true} color="black" />
      </View>
    );
  }
  if(!this.state.allowed){
    return(
        <EventNotAllowed eventState={this.state}/>
      );
  }
  //render Closed screen if registration is not open
  if(!this.state.user_can_register){
    return(
        <View style={styles.container}>
          <EventClosed
            eventState={this.state}
          />
          {/* Refresh button which reloads page */}
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity
              onPress={this.setParameters}
              style={styles.refreshButton}
            >
              <Image
                source={require('ChemieApp/src/Events/images/Refresh_icon.png')}
                style={{width:40, height:40}}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
  }
  return(
        <EventFormSocial
          eventState={this.state}
          navigation={this.props.navigation}
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
  refreshButton:{
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
    marginBottom:100,
    borderColor:'transparent',
    borderRadius:10,
    borderWidth: 1,
    backgroundColor:'green',
    width:70,
    height:70,

  }
});
