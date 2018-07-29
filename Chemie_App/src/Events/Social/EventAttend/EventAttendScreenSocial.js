import React from 'react';
import * as Progress from 'react-native-progress';

var moment = require('moment');

import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';

import EventClosed from 'Chemie_App/src/Events/Components/EventClosed';
import EventNotAllowed from 'Chemie_App/src/Events/Components/EventNotAllowed';
import EventFormSocial from './EventFormSocial';

import base_params from 'Chemie_App/Params.js';
const social_url = base_params.base_url.concat('/api/events/social/register/');
const bedpres_url = base_params.base_url.concat('/api/events/bedpres/register/');


export default class EventAttendScreenSocial extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.event.title}`,
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
  });
  constructor(props){
    super(props);
    this.state={
      loading:false,
      event_id: props.navigation.state.params.id,
      type:props.navigation.state.params.type,
      register_open:false,
      register_open_date:null,
      register_closed:false,
      register_closed_date:null,
      register_deadline_date:null,
      registered:false,
      screen:null,
      closed_text:null,
      allowed:true,
      payed:false,
      user_id:null,
      grade: null,
      event:props.navigation.state.params.event,
      AuthToken:props.navigation.state.params.AuthToken,
      timeTillopen:null,
    }
    this.setParameters = this.setParameters.bind(this);
    this.getregisterDateString = this.getregisterDateString.bind(this);
    this.getEventStatusFromAPI =   this.getEventStatusFromAPI.bind(this);
    this.getAsyncProfile = this.getAsyncProfile.bind(this);
    this.checkDates = this.checkDates.bind(this);
    this.checkAllowed = this.checkAllowed.bind(this);
  }
  getAsyncProfile = async() =>{

    let grade = await AsyncStorage.getItem('grade');
    let user_id = await AsyncStorage.getItem('id');

    this.setState({
      grade:grade,
      user_id:user_id,
    });

    this.checkAllowed()
  }
  checkDates(){

    let screen = "Open";
    let closed_text = "Arrangmentet er ikke åpent for påmelding enda.";
    let register_open = false;
    let register_closed = false;

    if (moment().isAfter(this.state.event.register_startdate)){
      register_open = true
    }else {
      var register_date = moment(this.state.event.register_startdate);
      var now = moment();
      screen = "Closed";
      this.setState({
        timeTillopen:register_date.from(now)
      });
    }
    if (moment().isAfter(this.state.event.register_deadline)){
      register_closed = true
      screen = "Closed";
      closed_text = "Deadlinen for avmelding er forbi, du kan ikke melde deg av arrangementet."
    }
    this.setState({
      register_open:register_open,
      register_open:register_open,
      screen:screen,
      closed_text:closed_text,
    })

  }
  getregisterDateString(){
    let register_open_date = moment(this.state.event.register_startdate).calendar()
    let register_closed_date = moment(this.state.event.register_closed_date).calendar()
    let register_deadline_date = moment(this.state.event.register_deadline_date).calendar()

    this.setState({
      register_open_date:register_open_date,
      register_closed_date:register_closed_date,
      register_deadline_date:register_deadline_date
    });
  }
  checkAllowed(){

    var grade = Number(this.state.grade);
    var allowed_grades = this.state.event.allowed_grades;
    if (!allowed_grades.includes(grade)){
      this.setState({
        allowed:false
      });
    }
    this.setState({
      loading:false
    });

  }
  setParameters(){
      this.setState({
        loading:true
      });

      this.getAsyncProfile();

      this.getEventStatusFromAPI();

      this.getregisterDateString();

      this.checkDates();



  }
  getEventStatusFromAPI= async()=>{

    fetch_url = social_url.concat(this.state.event_id)
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
  }
  componentWillMount(){

    this.setParameters();
  }
render(){
  if (this.state.loading) {
    return(
      <View style={styles.loadingContainer}>
        <Progress.Circle size={80} indeterminate={true} color="black" />
      </View>
    );
  }
  if(this.state.screen =="Closed"){
    return(
        <EventClosed
          event_id ={this.state.event_id}
          user_id  ={this.state.user_id}

        />
      );
  }

  if(!this.state.allowed){
    return(
        <EventNotAllowed eventState={this.state}/>
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


});
