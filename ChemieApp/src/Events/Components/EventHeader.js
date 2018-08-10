import  React, { Component } from 'react';
import  {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
 } from 'react-native';

import { Header } from 'react-navigation';

export default class EventHeader extends Component {
  constructor(props){
    super(props);
    this.state={
      loading:props.loading,
      currentScreen:props.firstScreen,
      _style_social:styles.headerButtonContainerClicked,
      _style_bedpres: styles.headerButtonContainer,
    }

  }

  setEvents(navigateToScreen){
    parentLoading = this.props.getLoadingStatus();
    if(!parentLoading && navigateToScreen!=this.state.currentScreen){
      this.setState({
        currentScreen:navigateToScreen,
      });
      if (navigateToScreen =="BedPres"){
        this.setState({
          _style_bedpres:styles.headerButtonContainerClicked,
          _style_social: styles.headerButtonContainer,
        });
      } else  {
        this.setState({
          _style_social:styles.headerButtonContainerClicked,
          _style_bedpres: styles.headerButtonContainer,
        });
      }

      this.props.updateParentState({screen:navigateToScreen, loading:true});
    }
  }

    render() {
        return (
          <View style={styles.headerContainer}>
            <View style={styles.headerTitleContainer}>
              <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Home')}
              >
                <Image
                  resizeMode='contain'
                  style={styles.Backarrow_icon}
                  source={require('../images/Backarrow_icon.png')}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                Events
              </Text>
            </View>
            <TouchableOpacity
              style={this.state._style_social}
              onPress={this.setEvents.bind(this,"Social")}
            >
              <Text>
                Sosialt
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={this.state._style_bedpres}
              onPress={this.setEvents.bind(this,"BedPres")}
            >
              <Text>
                BedPres
              </Text>
            </TouchableOpacity>
          </View>

       );
     }
}

const styles = StyleSheet.create({
  headerContainer:{
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    height:Header.HEIGHT + 10,
    paddingTop:5,
    backgroundColor:"#F9CF00",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  Backarrow_icon: {
      flex:1,
      width: 35,
      height: 35,
      marginTop:5,
  },
  headerTitleContainer:{
    flex:1.5,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    flexDirection:'row',
  },
  headerTitle:{
    fontSize:20,
    flex:2,
    marginLeft:10,
    fontWeight:'bold',
  },
  headerButtonContainer:{
    flex:1,
    backgroundColor:'#F9CF00',
    margin:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
    borderColor:'transparent',
    borderRadius:10,
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center',
    height:40,
  },
  headerButtonContainerClicked:{
    flex:1,
    backgroundColor:'#ffdd33',
    margin:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
    borderColor:'transparent',
    borderRadius:10,
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center',
    height:40,
  },

  headerButton:{
    backgroundColor:'transparent',
    height:30,
  }
});
