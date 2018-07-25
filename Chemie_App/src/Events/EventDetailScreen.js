import React from 'react';
import * as Progress from 'react-native-progress';

import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
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
    });
    const url = fetch_url.concat(this.props.navigation.state.params.id);
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
        return res;
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
        console.log(jsonResponse.length);
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

        this.setState({
          events:jsonResponse,
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
  return(
    <View style={styles.container}>

      <Text>EventDetailScreen</Text>
    </View>
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
    flex:1
  },

});
