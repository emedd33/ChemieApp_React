import React from 'react';
import * as Progress from 'react-native-progress';

var moment = require('moment'); //time package used to determine ETA and dates.
import 'moment/locale/nb'; //Norwegian language package used with moment()

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
import base_params from 'ChemieApp/Params.js';

//GET request
const social_url = base_params.base_url.concat('/api/events/social/');

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
    this.getAsyncProfile = this.getAsyncProfile.bind(this);
    this.checkDates = this.checkDates.bind(this);
    this.checkAllowed = this.checkAllowed.bind(this);
  }

  componentWillMount(){
    this.setParameters();
  }
  //Main function when loading component.
  setParameters = () =>{
      this.setState({
        loading:true
      })

      // fetching user id and users class grade
      //checking if user is allowed for event
      this.getAsyncProfile();


      //tranforming and adding readable dates and ETA to the state
      //checking if screen should render form, closed or not allowed.
      this.getregisterDateString()

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
  checkAllowed(){
    //checking if user is allowed for event
    var grade = Number(this.state.grade);
    var allowed_grades = this.state.event.allowed_grades;
    if (!allowed_grades.includes(grade)){
      this.setState({
        allowed:false
      });
    }

  }
  getregisterDateString(){
    // tranforming dates to readable strings

    let register_open_date = moment(this.state.event.register_startdate).calendar()
    let register_closed_date = moment(this.state.event.register_deadline).calendar()
    let register_deadline_date = moment(this.state.event.deregister_deadline).calendar()

    this.setState({
      register_open_date:register_open_date,
      register_closed_date:register_closed_date,
      register_deadline_date:register_deadline_date
    });
    this.checkDates();

  }
  checkDates(){
    //depending on the date and event, the state is changed

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
      console.log("Registered close");
      this.setState({
        register_closed:true,
        closed_text:"Deadlinen for avmelding er forbi, du kan ikke melde deg av arrangementet.",
      })
    }


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
  //render Closed screen if registration is not open
  console.log(this.state);
  if(this.state.screen =="Closed"){

    return(
        <View style={styles.container}>
          <EventClosed
            eventState={this.state}
          />
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

  // renders if user is not allowed to attend event,
  if(!this.state.allowed){
    return(
        <EventNotAllowed eventState={this.state}/>
      );
  }
  // default render which sets up the registration form for the user.
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
