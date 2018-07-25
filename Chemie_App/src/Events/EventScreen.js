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
const fetch_url = "http://192.168.1.101:8000/api/events/social/"

export default class EventScreen extends React.Component{
  static navigationOptions = {
    header:null,
    /*headerTitle: <EventHeader
      updateParentState={this.updateState}/>,
    headerStyle: {
     backgroundColor: '#F9CF00',
   },*/
 }

  constructor(props){
    super(props);
    this.state = {
      loading:true,
      AuthToken:'',
      screen:'Social',
    }
    this.updateState = this.updateState.bind(this);

    }
    updateState(data){
      console.log("data");
      this.setState(data);

    }

  componentWillMount(){
    console.log("Events componentWillMount");
    this.updateState.bind(this);
  }
  componentDidMount(){
    this.setState({
      loading:false,
    });
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
      <EventHeader
        updateParentState={this.updateState}
        navigation={this.props.navigation}
      />
      <View style={styles.EventContainer}>
        <Text>
          {this.state.screen}
        </Text>
      </View>

    </View>
    );
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
