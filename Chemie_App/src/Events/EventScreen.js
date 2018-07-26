import React from 'react';
import * as Progress from 'react-native-progress';


import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Button,
} from 'react-native';

import EventHeader from './EventsHeader';
import SocialEvents from './SocialEvents';
import BedPressEvents from './BedPressEvents'
const fetch_url = "http://192.168.1.101:8000/api/events/social/"


// TODO: Filter out events which are overdue

export default class EventScreen extends React.Component{
  static navigationOptions = {
    header:null,

 }

  constructor(props){
    super(props);
    this.state = {
      screen:'Social',
    }
    this.updateState = this.updateState.bind(this);

    }
    updateState(data){

      this.setState(data);

    }

  componentWillMount(){
    console.log("Events componentWillMount");
    this.updateState.bind(this);
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

render(){

  if (this.state.screen=="Social" ) {

      return(
      <View style={styles.container}>
        <EventHeader
          updateParentState={this.updateState}
          navigation={this.props.navigation}
        />
        <SocialEvents navigation={this.props.navigation}/>

      </View>
      );
  } else if (this.state.screen=="BedPress" ) {
      return(
      <View style={styles.container}>
        <EventHeader
          updateParentState={this.updateState}
          navigation={this.props.navigation}
        />
        <BedPressEvents navigation={this.props.navigation}/>

      </View>
      );
    } else {
      return(
      <View style={styles.container}>
        <EventHeader
          updateParentState={this.updateState}
          navigation={this.props.navigation}
        />
        <View style={styles.EventContainer}>

        </View>

      </View>
      );

  }

  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  EventContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',

  }


});
