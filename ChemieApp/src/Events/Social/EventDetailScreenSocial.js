import React from 'react';
import * as Progress from 'react-native-progress';
import HTML from 'react-native-render-html';
import ProgressBarAnimated from 'react-native-progress-bar-animated';


import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,

} from 'react-native';

import getMonth from 'ChemieApp/src/Functions/getMonth';
import HttpRequest from 'ChemieApp/src/Functions/HttpRequests';
import base_params from 'ChemieApp/Params.js';

const FETCH_SOCIAL_URL = base_params.base_url.concat('/api/events/social/');



export default class EventDetailScreenSocial extends React.Component{
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
      authToken:props.navigation.state.params.authToken,
      event_id:props.navigation.state.params.id,
      profile:props.navigation.state.params.profile,
    }
    this.setParameters = this.setParameters.bind(this);
    this.convertEventStringsFromJsonResponse = this.convertEventStringsFromJsonResponse.bind(this);

  }

  //Formatting response from server for readability to user

  //Main function which get the events specifics
  setParameters = async()=>{
    const url = FETCH_SOCIAL_URL.concat(this.props.navigation.state.params.id).concat("/");
    let jsonResponse = await HttpRequest.GetRequest(url, this.props.navigation.state.params.authToken);

    this.setState({
      event:jsonResponse.response[0],
    });

    //user is not authenticated
    if (jsonResponse.httpStatus == 401){
      //AsyncStorage.removeItem('AuthToken');;
      //this.props.navigation.navigate('Login');
    }
    if (jsonResponse.httpStatus >= 200 && jsonResponse.httpStatus < 300) {
      this.convertEventStringsFromJsonResponse();
      }
    this.setState({
      loading:false,
    })

    }

  convertEventStringsFromJsonResponse(){
    month = this.state.event.date.slice(5,7);
    month_name = getMonth.getMonthFunction(month);

    day = this.state.event.date.slice(8,10);
    time = this.state.event.date.slice(11,16);
    let date_String = day + " " + month_name + ' - ' + time;
    this.state.event['string_date'] = date_String;

    //Adding an instance of number of spots to response
    slut_spots = this.state.event.attendees.length;
    this.state.event['slut_spots'] = slut_spots;
    this.state.event['progress_sluts'] = 100*(slut_spots/this.state.event['sluts']);

    if (this.state.event.price_member == 0) {
        this.state.event['price_member'] = "Gratis."
      } else {
        var price_string = String(this.state.event['price_member']);
        price_string= price_string.concat(' kr.');
        this.state.event['price_member'] = price_string;
      }
    if (this.state.event.price_not_member == 0) {
        this.state.event['price_not_member'] = "Gratis."

      } else {

        var price_string = String(this.state.event['price_not_member']);
        price_string= price_string.concat(' kr.');
        this.state.event['price_not_member'] = price_string;

        }
    }

  //Navigation to screen for registration
  attendEventNavigation(body){
     this.props.navigation.navigate('EventAttendSocial', body);
  }

  componentWillMount(){
    if (this.state.events == null){
      this.setParameters()
    }

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

  //checking if events is full
  var numberOfAttendees = <Text>{this.state.event.slut_spots} av {this.state.event.sluts}</Text>
  if (this.state.event.slut_spots >= this.state.event.sluts){
    numberOfAttendees = <Text>Arrangementet er fult.</Text>
  }
  return(
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.eventImage}
          source={{uri:this.state.event.image}}
        >
        </Image>
      </View>
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.goToFormButton}
          onPress={this.attendEventNavigation.bind(this,{
            event_id:this.state.event_id,
            event:this.state.event,
            authToken:this.state.authToken,
            profile:this.state.profile
          })}
        >
          <Text>Gå til påmelding</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.eventContent}>
        <View style={styles.eventSummary}>
          <View style={styles.eventSummaryItem}>
            <Text style={{fontWeight:'bold', marginRight:10}}>
              Når:
            </Text>
            <Text>
              {this.state.event.string_date}
            </Text>
          </View>
          <View style={styles.eventSummaryItem}>
            <Text style={{fontWeight:'bold', marginRight:10}}>
              Hvor:
            </Text>
            <Text>
              {this.state.event.location}
            </Text>
          </View>
          <View style={styles.eventSummaryItem}>
            <Text style={{fontWeight:'bold', marginRight:10}}>
              Pris medlem:
            </Text>
            <Text>
              {this.state.event.price_member}
            </Text>
          </View>
          <View style={styles.eventSummaryItem}>
            <Text style={{fontWeight:'bold', marginRight:10}}>
              Pris ikke-medlem:
            </Text>
            <Text>
              {this.state.event.price_not_member}
            </Text>
          </View>
          <View style={styles.eventSummaryItem}>
            <Text style={{fontWeight:'bold', marginRight:10}}>
              Påmeldte:
            </Text>
            {numberOfAttendees}

          </View>
          <ProgressBarAnimated
            width={200}
            height={5}
            value={this.state.event.progress_sluts}
            onComplete={() => {

            }}
          />

        </View>
        <View style={styles.contentText}>
          <Text style={{fontWeight:'bold'}}>
            Beskrivelse:
          </Text>
          <HTML  html={this.state.event.description} imagesMaxWidth={Dimensions.get('window').width} />
          <Text style={{fontWeight:'bold', paddingTop:10}}>
            Betalingsinformasjon:
          </Text>
          <HTML  html={this.state.event.payment_information} imagesMaxWidth={Dimensions.get('window').width} />
        </View>
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
    flex:0.7,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:10,
    margin:10,
  },
  eventImage:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:20,
    borderWidth: 1,

  },
  foregroundLayour:{
    backgroundColor:'black',
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

  //form button
  formContainer:{
    flex:0.2,
    alignItems:'center',
    justifyContent: 'center',
  },
  goToFormButton:{
    backgroundColor:'#F9CF00',
    alignSelf: 'stretch',
    height:40,
    marginLeft:50,
    marginRight:50,
    borderRadius:10,
    marginBottom:10,
    marginTop:10,
    borderWidth: 1,
    borderColor:'#F9CF00',
    alignItems:'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },

  //Desciption and hvem hva hvor block
  eventContent:{
    flex:2,
  },
  eventSummary:{
    flex:1,
    alignItems:'center',
    flexDirection:'column',
    padding:10,
  },
  eventSummaryItem:{
    flexDirection:'row',
    width:200,
    flex:1,

  },
  contentText:{
    padding:10,
  }

});
