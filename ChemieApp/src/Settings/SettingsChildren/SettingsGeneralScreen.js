import React from 'react';
import * as Progress from 'react-native-progress';

import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

export default class SettingsGeneralScreen extends React.Component{
  static navigationOptions = {
    title: 'generelt',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
  }
  constructor(props){
    super(props);
    this.state=this.props.navigation.state.params.state;
    this.logoutPress=this.logoutPress.bind(this);
    this.logoutSubmit=this.logoutSubmit.bind(this);
  }
  logoutSubmit = async() => {
    this.setState({
      loading:true
    })
    try{
      // TODO: remove other prefferences
      await AsyncStorage.removeItem('AuthToken');
      await AsyncStorage.removeItem('AuthToken');
      await AsyncStorage.removeItem('firstname');
      await AsyncStorage.removeItem('lastname');
      await AsyncStorage.removeItem('access_card');
      await AsyncStorage.removeItem('membership')
    } catch (error) {
      alert(error);
    }
    this.setState({
      loading:false
    })
  }
  logoutPress(){
    Alert.alert(
    'Sign out',
    'Sikker på at du vil logge ut?',
    [
      {text: 'Nei', style: 'cancel' },
      {text: 'Ja', onPress: () => {
      this.logoutSubmit()
      .then(this.props.navigation.navigate('Login'))},
      }
    ],
      { cancelable: true }
    );
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

  let firstname = <Text style={{fontSize:20}}>{this.state.firstname}</Text>
  let lastname = <Text style={{fontSize:20}}>{this.state.lastname}</Text>
  let membership = <Text style={{fontSize:15}}>{this.state.membership}</Text>
  let access_card = <Text style={{fontSize:15}}>{this.state.access_card}</Text>
  return(
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={{marginTop:10}}>Logget inn som</Text>
        <View style={styles.nameContainer}>
          {firstname}
          {lastname}
        </View>
      </View>
      <View style={{margin:10, }}>
        <View style={{flexDirection:'row', margin:10}}>
          <Text style={{fontSize:15, fontWeight:'bold'}}>Medlemskap i HC: </Text>
          {membership}
        </View>
        <View style={{flexDirection:'row', margin:10}}>
          <Text style={{fontSize:15,  fontWeight:'bold'}}>Adgangskort: </Text>
          {access_card}
        </View>
      </View>


      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={this.logoutPress}
        >
          <Text
            style={styles.buttonText}
          >Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  loadingContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
  },
  infoContainer:{
    marginRight:20,
    marginLeft:20,
    marginTop:10,
    alignSelf: 'stretch',
    borderRadius:10,
    height:150,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    backgroundColor:'ghostwhite',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  nameContainer:{
    flexDirection:'row',
    height:70,
    alignItems:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  logoutContainer:{
    justifyContent:'center',
    alignItems:'center',
  },
  logoutButton:{
    backgroundColor:'red',
    borderRadius:20,
    borderWidth: 1,
    borderColor:"red",
    alignSelf: 'stretch',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    margin:50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText:{
    color:'white',
  }

});
