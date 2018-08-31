import React from 'react';
import * as Progress from 'react-native-progress';


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

//import EventDetailScreen from './EventDetailScreen';

import base_params from 'Chemie_App/Params.js';
const fetch_url = base_params.base_url.concat('/api/events/bedpres/');


export default class BedPresEvents extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      events: "empty",
      AuthToken:null,
      connected:false,
      httpStatus:null,
      loading:props.loading,
      }
      this.getEventsFromAPI = this.getEventsFromAPI.bind(this);
      this.getMonth = this.getMonth.bind(this);

  }
  componentWillUnmount(){

  }

  getEventsFromAPI = async() => {
      this.props.updateParentState({loading:true});
      let token = await AsyncStorage.getItem('AuthToken');
      this.setState({
        AuthToken:token,
      });
      try{
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


      //If token is not valid, sends user to loginScreen,
      if (this.state.httpStatus == 401){
        AsyncStorage.removeItem('AuthToken');
        this.props.navigation.navigate('Login');

      }
      if (this.state.httpStatus >= 200 && this.state.httpStatus < 300) {
        if (jsonResponse.length>=1) {
          //Converting date to more readable format for user
          for (var i = 0; i<jsonResponse.length && i < 5; i++){

            month = jsonResponse[i].date.slice(5,7);
            month_name = this.getMonth(month);

            day = jsonResponse[i].date.slice(8,10);
            time = jsonResponse[i].date.slice(11,16);
            let date_String = day + " " + month_name + ' - ' + time;
            jsonResponse[i].date = date_String;

            //Adding an instance of number of spots to response
            slut_spots = jsonResponse[i].attendees.length;
            jsonResponse[i]['slut_spots'] = slut_spots;

          }
      } else {
        jsonResponse = "empty";
      }
      this.setState({
        events:jsonResponse,
        connected:true,
      });
    }
    }
    catch(error){

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
  getMonth(month) {
    result = month;
    switch(parseInt(month)){
      case 1:
        result = 'Januar';
        break;
      case 2:
        result = 'Februar';
        break;
      case 3:
        result = 'Mars';
        break;
      case 4:
        result = 'April';
        break;
      case 5:
        result = 'Mai';
        break;
      case 6:
        result = 'Juni';
        break;
      case 7:
        result = 'Juli';
        break;
      case 8:
        result = 'August';
        break;
      case 9:
        result = 'September';
        break;
      case 10:
        result = 'Oktober';
        break;
      case 11:
        result = 'November';
        break;
      case 12:
        result = 'Desember';
        break;
    }
    return result;
  }

  detailNavigation(body){

     this.props.navigation.navigate('EventDetailScreenBedPres', body);
  }
render(){
  console.log("loading: ",this.state.loading);
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
                    fetch_url:fetch_url,
                    type:'BedPres',
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
    height:200,

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
