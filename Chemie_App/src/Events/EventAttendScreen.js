import React from 'react';
import * as Progress from 'react-native-progress';

var moment = require('moment');

import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class EventAttendScreen extends React.Component{
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
      event:props.navigation.state.params.event,
      AuthToken:props.navigation.state.params.AuthToken,
      timeTillopen:null,
    }
    this.setParameters = this.setParameters.bind(this);
    this.getregisterDateString = this.getregisterDateString.bind(this);
  }
  getregisterDateString(){
    let register_open_date = moment(this.state.event.register_startdate).calendar()
    let register_closed_date = moment(this.state.event.register_closed_date).calendar()
    let register_deadline_date = moment(this.state.event.register_deadline_date).calendar()
    console.log(register_open_date);
    this.setState({
      register_open_date:register_open_date,
      register_closed_date:register_closed_date,
      register_deadline_date:register_deadline_date
    });
  }
  setParameters(){
      this.setState({
        loading:true
      })
      this.getregisterDateString();

      let screen = "Closed";
      let closed_text = "Arrangmentet er ikke åpent for påmelding enda.";
      let register_open = false;
      let register_closed = false;
      console.log("EventAttendScreen setParameters");

      if (moment().isAfter(this.state.event.register_startdate)){
        register_open = true
      }else {

        var register_date = moment(this.state.event.register_startdate);
        var now = moment();

        this.setState({
          timeTillopen:register_date.from(now)
        });

      }
      if (moment().isAfter(this.state.event.register_deadline)){
        register_closed = true
        closed_text = "Deadlinen for avmelding er forbi, du kan ikke melde deg av arrangementet."
      }
      if (register_open && !register_closed){

      } else {
        this.setState({
          register_open:register_open,
          register_open:register_open,
          loading:false,
          screen:screen,
          closed_text:closed_text,
        })
      }


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
      <View style={styles.container}>
        <View style={styles.defaultDenied}>
          <View style={styles.defaultDeniedUpper}>
            <View style={{flex:1,width:300,paddingTop:10, flexDirection:'row'}}>
              <Image
                source={require('./images/Calendar_icon.png')}
                style={{width:40, height:40}}
              />
              <Text style={{fontSize:20, paddingTop:10}}>Datoer</Text>
            </View>
            <View style={{flex:1.5  , width:300}}>
              <View style={{flexDirection:'row'}}>
                <Text>Påmeldingen åpner: </Text><Text style={{position:'absolute', right:0}}>{this.state.register_open_date}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text>Påmeldingsfrist:</Text><Text style={{position:'absolute', right:0}}>{this.state.register_closed_date}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text>Avmeldingsfrist:</Text><Text style={{position:'absolute', right:0}}>{this.state.register_deadline_date}</Text>
              </View>




            </View>
          </View>
          <View style={styles.defaultDeniedLower}>
            <Text>{this.state.closed_text}</Text>
            <Text style={{marginTop:10}}>Open {this.state.timeTillopen}</Text>
          </View>

        </View>
      </View>
      );
  }
  return(
    <View style={styles.container}>

      <Text>EventAttendScreen</Text>
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
    flex:1,
  },
  defaultDenied:{
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
    alignItems:'center',
    justifyContent: 'center',

  },
  defaultDeniedUpper:{
    flex:2,

  },
  defaultDeniedLower:{
    flex:1,
    justifyContent:'center',
  },

});
