import React from 'react';
import * as Progress from 'react-native-progress';
import ImageResizer from 'react-native-image-resizer';

import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';

import getMonth from 'ChemieApp/src/Functions/getMonth';
import HttpRequest from 'ChemieApp/src/Functions/HttpRequests';

import EventDetailScreenBedPres from './EventDetailScreenBedPres';
import clearAsyncStorage from 'ChemieApp/src/Functions/clearAsyncStorage'
import base_params from 'ChemieApp/Params.js';
const FETCH_BEDPRES_URL = base_params.base_url.concat('/api/events/bedpres/');


export default class BedPresEvents extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      events: "empty",
      authToken:props.state.authToken,
      connected:false,
      httpStatus:null,
      loading:props.loading,
      }
      this.getEventsFromAPI = this.getEventsFromAPI.bind(this);

  }
  componentWillUnmount(){

  }

  getEventsFromAPI = async() => {
      this.props.updateParentState({loading:true});
      console.log(FETCH_BEDPRES_URL);
      let jsonResponse = await HttpRequest.GetRequest(FETCH_BEDPRES_URL,this.state.authToken);

      //If token is not valid, sends user to loginScreen,
      if (jsonResponse.httpStatus == 401){
        // TODO: Check this clearAsyncStorage
        //await clearAsyncStorage.clearAll();
        Alert.alert("Ups","Det var noe feil ved autorisering, venligst log inn igjen");
        //this.props.navigation.navigate('Login');

      }
      if (jsonResponse.httpStatus >= 200 && jsonResponse.httpStatus < 300) {
        if (jsonResponse.response.length>=1) {
          //Converting date to more readable format for user
          for (var i = 0; i<jsonResponse.response.length && i < 5; i++){

            month = jsonResponse.response[i].date.slice(5,7);
            month_name = getMonth.getMonthFunction(month);


            day = jsonResponse.response[i].date.slice(8,10);
            time = jsonResponse.response[i].date.slice(11,16);
            let date_String = day + " " + month_name + ' - ' + time;
            jsonResponse.response[i].date = date_String;

            //Adding an instance of number of spots to response
            slut_spots = jsonResponse.response[i].attendees.length;
            jsonResponse.response[i]['slut_spots'] = slut_spots;
          }
      } else {
        jsonResponse.response = "empty";
      }
      console.log(jsonResponse.response);
      this.setState({
        events:jsonResponse.response,
        connected:true,
      });
    }
    this.props.updateParentState({loading:false});
    this.setState({
      loading:false
    });
  }

  componentWillMount(){
    if (this.state.events == "empty"){
      this.getEventsFromAPI();
    }
  }


  detailNavigation(body){

     this.props.navigation.navigate('EventDetailScreenBedPres', body);
  }
render(){
  if(this.state.loading){
    return(
      <View style={styles.loadingContainer}>
        <Progress.Circle size={80} indeterminate={true} color="black" />
      </View>
    )
  }
  console.log("connected:",this.state.connected);
  if(!this.state.connected){
    return(
      <View style={styles.loadingContainer}>
        <Text>Ingen nettforbindelse</Text>
      </View>
    );
  }
  console.log("events:", this.state.events);
  if(this.state.events == "empty"){
    return(
      <View style={styles.loadingContainer}>
        <Text>Ingen arrangementer å hente</Text>
      </View>
    );
  }
  return(
    <ScrollView style={styles.container}>
      {
        this.state.events.map(( item, key ) =>
          (
            // TODO: Add image to background,
              <View key = { key } style = { styles.container}>
                <TouchableOpacity
                  style={styles.eventConatiner}
                  onPress={this.detailNavigation.bind(this,{
                    id:item.id,
                    title:item.title,
                    authToken:this.state.authToken,
                  })}
                >

                  <View style={ styles.titleContainer }>
                    <Text style={styles.eventTitle}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.titleDate}>
                      {item.date}
                    </Text>
                    <Text style={styles.titleDate}>
                      {item.location}
                    </Text>
                    <Text style ={styles.numberOfAttendees}>
                      {item.slut_spots} av {item.sluts} påmeldte
                    </Text>
                  </View>
                </TouchableOpacity>

              </View>


          ))
      }
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  loadingContainer:{
    marginTop:50,
    justifyContent:'center',
    alignItems:'center',
  },
  eventConatiner:{
    flex:1,
    margin:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
    borderColor:'transparent',
    borderRadius:10,
    borderWidth: 1,
    height:170,
    backgroundColor:'ghostwhite',

  },

  //Upper part over EventContainer
  infoContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  titleContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
  },
  eventTitle:{
    fontSize:30,
    fontWeight:'bold',
    flex:1,
    textAlign:'center',
    margin:20,
  },
  // lower part of event Container

  numberOfAttendees:{
    textAlign:'center',
  },



});
