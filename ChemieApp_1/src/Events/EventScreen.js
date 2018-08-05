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



// TODO: Filter out events which are overdue

export default class EventScreen extends React.Component{
  static navigationOptions = {
    header:null,
  }

  constructor(props){
    super(props);
    this.state = {
      screen:'Social',
      loading:true,
    }
    this.updateState = this.updateState.bind(this);
    this.getLoadingStatus=this.getLoadingStatus.bind(this);
    }
  updateState(data){
      this.setState(data);
    }
  getLoadingStatus(){
    return this.state.loading;
  }
  componentWillMount(){
  }
  componentDidMount(){
    this.setState({
      loading:false
    })
  }

render(){
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
        />


      </View>
      );
  } else if (this.state.screen=="BedPres" ) {
    console.log(this.state.loading);
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
