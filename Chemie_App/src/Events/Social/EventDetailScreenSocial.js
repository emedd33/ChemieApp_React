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

import base_params from 'Chemie_App/Params.js';
const fetch_url = base_params.base_url.concat('/api/events/social/');



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
      AuthToken:null,
      id:null,
      fetch_url:null,
      type:null,
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

    let token = await AsyncStorage.getItem('AuthToken');
    this.setState({
      AuthToken:token,
      fetch_url:this.props.navigation.state.params.fetch_url,
      type:this.props.navigation.state.params.type,
      id: this.props.navigation.state.params.id,
    });
    const url = this.state.fetch_url.concat(this.props.navigation.state.params.id).concat("/");

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
          month = jsonResponse.date.slice(5,7);
          month_name = this.getMonth(month);

          day = jsonResponse.date.slice(8,10);
          time = jsonResponse.date.slice(11,16);
          let date_String = day + " " + month_name + ' - ' + time;
          jsonResponse['string_date'] = date_String;

          //Adding an instance of number of spots to response
          slut_spots = jsonResponse.attendees.length;
          jsonResponse['slut_spots'] = slut_spots;
          jsonResponse['progress_sluts'] = 100*(slut_spots/jsonResponse['sluts']);

          if (this.state.type == "Social"){
            if (jsonResponse.price_member == 0) {
              jsonResponse['price_member'] = "Gratis"
            } else {
              var price_string = String(jsonResponse['price_member']);
              price_string.concat(' kr.');
              jsonResponse['price_member'] = price_string;
            }
          } else {
              jsonResponse['price_member'] = "Gratis"
              jsonResponse['payment_information'] = "Gratis arrangement. Husk at ved påmelding så forplikter du deg til å møte opp. Fravær vil føre til utestengelse fra arrangementer."
          }
        this.setState({
          event:jsonResponse,
        });
      }
      this.setState({
        loading:false,
      })
  }
  attendEventNavigation(body){
     this.props.navigation.navigate('EventAttendSocial', body);
  }

  componentWillMount(){
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
            id:this.state.id,
            event:this.state.event,
            fetch_url:this.state.fetch_url,
            type:this.state.type,
            AuthToken:this.state.AuthToken,
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
              Påmeldte:
            </Text>
            <Text>
              {this.state.event.slut_spots} av {this.state.event.sluts}
            </Text>

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
