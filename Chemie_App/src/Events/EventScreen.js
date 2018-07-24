import React from 'react';
import * as Progress from 'react-native-progress';

import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  TouchableOpacity,
} from 'react-native';

const fetch_url = "http://192.168.1.101:8000/api/events/social/"

export default class EventScreen extends React.Component{
  static navigationOptions = {
    title: 'Events',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
    };
  constructor(props){
    super(props);
    this.state = {
      events: [],
      loading:true,
      AuthToken:'',
      httpStatus:null,
      }
      this.getEventsFromAPI = this.getEventsFromAPI.bind(this);
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
          year = jsonResponse[i].date.slice(0,4);
          month = jsonResponse[i].date.slice(5,7);
          day = jsonResponse[i].date.slice(8,10);
          let date_String = "Publisert " + day + "/" + month + "/" + year;
          jsonResponse[i].date = date_String;
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
      {
        this.state.events.map(( item, key ) =>
          (

            <View key = { key } style = { styles.item }>
              <TouchableOpacity>
                <Text style = { styles.titleText }>{ item.title }</Text>
                <Text style = { styles.dateText }>{ item.date}</Text>
                <Image
                  resizeMode='contain'
                  style={styles.eventImage}
                  source={{uri:item.image}} />

                <View style = { styles.eventSeparator }/>
              </TouchableOpacity>
            </View>


          ))
      }
    </View>
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
  contentText:{

  },
  eventImage:{
    width:200,
    height:200,
    alignSelf:'center',

  },
  eventSeparator:{
    height:20,
  },
  titleText:{
    textAlign:'center',
    fontSize:40,

  },
  dateText:{
    textAlign:'center',
  },
});
