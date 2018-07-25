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

import EventDetailScreen from './EventDetailScreen';
const fetch_url = "http://192.168.1.101:8000/api/events/social/"

export default class SocialEvents extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      events: [],
      loading:true,
      AuthToken:'',
      httpStatus:null,
      }
      this.getEventsFromAPI = this.getEventsFromAPI.bind(this);
      this.getMonth = this.getMonth.bind(this);

  }

  getEventsFromAPI = async() => {
    console.log("events getEventsFromAPI");
    let token = await AsyncStorage.getItem('AuthToken');
    this.setState({
      AuthToken:token,
    });
    console.log(token);
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

      //If token is not valid, sends user to loginScreen,
      if (this.state.httpStatus == 401){
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');

      }
      if (this.state.httpStatus >= 200 && this.state.httpStatus < 300) {

        //Converting date to more readable format for user
        for (var i = 0; i<jsonResponse.length && i < 5; i++){
          console.log(jsonResponse[i].date);
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

        this.setState({
          events:jsonResponse,
        });
      }
      this.setState({
        loading:false,
      })
  }
  componentWillMount(){
    console.log("Events componentWillMount");
    this.getEventsFromAPI()
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

  detailNavigation(id){
    console.log(id);
     this.props.navigation.navigate('EventDetailScreen', {id});
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
    <ScrollView style={styles.container}>
      {
        this.state.events.map(( item, key ) =>
          (

            <View key = { key } style = { styles.container}>
              <TouchableOpacity
                style={styles.eventConatiner}
                onPress={this.detailNavigation.bind(this,item.id)}
              >
                <View style={styles.imageContainer}>

                  <ImageBackground style={ styles.imgBackground }
                    // TODO: Compress image before rendering since it may slow down app

                    resizeMode='cover'
                    source={{uri:item.image}}>
                    <View style={styles.imageOverlay}>
                      <Text style={styles.overlayTitle}>
                        {item.date}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>

                <View style={styles.infoContainer}
                >
                  <Text style={styles.eventTitle}>
                    {item.title}
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
    height:300,

  },

  //Upper part over EventContainer
  imageContainer:{
    flex:2,
  },
  imgBackground:{
    width: '100%',
    height: '100%',
    flex: 1,
  },
  imageOverlay:{
    marginTop:100,
    backgroundColor:'black',
    opacity:0.5,
    alignSelf: 'stretch',
    height:'30%',
    position: 'absolute',
    bottom:0,
    right:0,
    left:0,
    alignItems:'center',
    justifyContent:'center',
  },
  overlayTitle:{
    color:'white',
    fontSize:20,
    opacity:1,
  },

  // lower part of event Container
  infoContainer:{
    flex:1,

    justifyContent:'center',
    alignItems:'center',
    margin:10,
  },
  eventTitle:{
    fontSize:20,
    flex:1,
    textAlign:'center',
    margin:20,
  },
  numberOfAttendees:{
    textAlign:'center',
  },



});
