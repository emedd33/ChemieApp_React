import React from 'react';
import * as Progress from 'react-native-progress';
import HTML from 'react-native-render-html';
var moment = require('moment');

import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,

} from 'react-native';


const fetch_url = "http://192.168.1.101:8000/api/events/social/"

export default class EventDetailScreen extends React.Component{
  static navigationOptions = ({ navigation }) => ({
   title: `${navigation.state.params.title}`,
    headerTitleStyle : {
      textAlign: 'center',
      alignSelf:'center'},
       headerStyle:{
           backgroundColor:'#F9CF00',
       },
   });
  constructor(props){
    super(props);
    this.state={
      loading:true,
      event:null,
      AuthToken:null,
      id:null,
      fetch_url:null,
    }
    this.getEventsFromAPI = this.getEventsFromAPI.bind(this);
    this.getMonth = this.getMonth.bind(this);
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


  getEventsFromAPI = async() => {
    console.log("events getEventsFromAPI");
    let token = await AsyncStorage.getItem('AuthToken');
    this.setState({
      AuthToken:token,
      fetch_url:this.props.navigation.state.params.fetch_url
    });
    const url = this.state.fetch_url.concat(this.props.navigation.state.params.id);
    console.log(url);
    let jsonResponse = await fetch(url,{
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
        return res[0];
      })
      .catch((error) => {
         alert(error);
      });

      //If token is not valid, sends user to loginScreen,
      if (this.state.httpStatus == 401){
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');

      }
      if (this.state.httpStatus >= 200 && this.state.httpStatus < 300) {
          console.log(jsonResponse);
          month = jsonResponse.date.slice(5,7);
          month_name = this.getMonth(month);

          day = jsonResponse.date.slice(8,10);
          time = jsonResponse.date.slice(11,16);
          let date_String = day + " " + month_name + ' - ' + time;
          jsonResponse['string_date'] = date_String;

          //Adding an instance of number of spots to response
          slut_spots = jsonResponse.attendees.length;
          jsonResponse['slut_spots'] = slut_spots;

        this.setState({
          event:jsonResponse,
        });
      }
      this.setState({
        loading:false,
      })
  }

  componentWillMount(){
    console.log("EventDetailScreen componentWillMount");
    this.getEventsFromAPI();

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
  /*var now = moment().fromNow();
  var date = moment(this.state.event.date);
  console.log(date);
  console.log(now);
  console.log(moment(now).isAfter(date));
*/
console.log(this.state.event);
  return(
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ImageBackground
          style={styles.eventImage}
          source={{uri:this.state.event.image}}
          resizeMode="contain"
        >
          <View style={styles.foregroundLayour}>
            <Text style={styles.titleText}>{this.state.event.title}</Text>
          </View>
        </ImageBackground>


      </View>
      <View style={styles.formContainer}>
        <Text>formContainer</Text>
      </View>
      <ScrollView style={styles.eventContent}>
        <HTML style={styles.contentText} html={this.state.event.description} imagesMaxWidth={Dimensions.get('window').width} />
      </ScrollView>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  //
  loadingContainer:{
    alignItems:'center',
    justifyContent: 'center',
    flex:1,

  //ImageBackground styling,
  },
  titleContainer:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'black',

  },
  eventImage:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems:'center',
    justifyContent: 'center',
  },
  foregroundLayour:{
    backgroundColor:'black',
    position: 'absolute',
    bottom:0,
    right:0,
    left:0,
    alignSelf: 'stretch',
    height:50,
    opacity:0.5,

  },
  titleText:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    color:'#fff',
  },
  formContainer:{
    flex:0.2,
    backgroundColor:'skyblue',
    alignItems:'center',
    justifyContent: 'center',
  },
  eventContent:{
    flex:2,

  },
  contentText:{

  }

});
