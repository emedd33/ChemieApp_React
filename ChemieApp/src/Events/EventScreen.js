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

import EventHeader from './Components/EventHeader';
import SocialEvents from './Social/SocialEvents';
import BedPresEvents from './BedPres/BedPresEvents'


import base_params from 'ChemieApp/Params.js';
const fetch_url = base_params.base_url.concat('/api/events/social/');


export default class EventScreen extends React.Component{
  static navigationOptions = {
    header:null,
  }

  constructor(props){
    super(props);
    this.state = {
      screen:'Social',
      loading:true,
      profile:props.navigation.state.params.profile,
      authToken:props.navigation.state.params.authToken,
    }
    this.updateState = this.updateState.bind(this);
    this.getLoadingStatus=this.getLoadingStatus.bind(this);
    }
  //used by child component to update EventScreen
  updateState(data){
    this.setState(data);
  }

  //used by child components to get loading status.
  getLoadingStatus(){
    return this.state.loading;
  }

  componentDidMount(){
    this.setState({
      loading:false
    })
  }

render(){
  /*
    This screen is divided into Social and Bedpres, thus two different components are loaded
    EventHeader is a custom header which have added navigation buttons
  */

  //Social events are selected
  if (this.state.screen=="Social" ) {
      return(
      <View style={styles.container}>
        <EventHeader
          updateParentState={this.updateState}
          navigation={this.props.navigation}
          firstScreen="Social"
          loading={this.state.loading}
          getLoadingStatus={this.getLoadingStatus}
        />
        <SocialEvents
          updateParentState={this.updateState}
          navigation={this.props.navigation}
          loading={this.state.loading}
          state={this.state}
        />


      </View>
      );
  } //Bedpres is selected
  else if (this.state.screen=="BedPres" ) {
      return(
      <View style={styles.container}>
        <EventHeader
          updateParentState={this.updateState}
          navigation={this.props.navigation}
          firstScreen="BedPres"
          loading={this.state.loading}
          getLoadingStatus={this.getLoadingStatus}
        />
        <BedPresEvents
          updateParentState={this.updateState}
          navigation={this.props.navigation}
          loading={this.state.loading}
          state={this.state}
        />

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

  },
  loadingContainer:{
    marginTop:50,
    justifyContent:'center',
    alignItems:'center',
  },


});
