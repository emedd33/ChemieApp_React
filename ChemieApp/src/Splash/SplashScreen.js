import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  AsyncStorage,
  KeyboardAvoidingView,
  YellowBox
} from 'react-native';


export default class splashscreen extends React.Component{
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props)
    this.state={
      profile:null,
      isAuthenticated:false,
      authToken:null,
    }

    this.checkAuthToken = this.checkAuthToken.bind(this);
    this.getAsyncStorageSettings = this.getAsyncStorageSettings.bind(this);
  }

  checkAuthToken = async () => {
    try {
      let isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
      // TODO: Find a better conditions to check if token is correct
      if (isAuthenticated){
          await this.getAsyncStorageSettings();
      } else {
        setTimeout(()=>{
          this.props.navigation.navigate("Login");
        }, 2000);
      }

    }
     catch (error) {
      alert(error);
    }
  }
  getAsyncStorageSettings = async() => {
    let authToken = await AsyncStorage.getItem('authToken');
    let firstname = await AsyncStorage.getItem('firstname');
    let lastname = await AsyncStorage.getItem('lastname');
    let access_card = await AsyncStorage.getItem('access_card');
    let grade = await AsyncStorage.getItem('grade');
    let username = await AsyncStorage.getItem('username');
    let id = await AsyncStorage.getItem('id');
    let infoSubscription = await AsyncStorage.getItem('fcmINFO');
    let kaffeSubscription = await AsyncStorage.getItem('fcmKAFFE');
    let eventSubscription = await AsyncStorage.getItem('fcmEVENT');

    profile = {
      firstname:firstname,
      lastname:lastname,
      access_card:access_card,
      grade:grade,
      username:username,
      id:id,
      kaffeSubscription:kaffeSubscription,
      eventSubscription:eventSubscription,
      infoSubscription:infoSubscription,
    }
    this.setState({
      profile:profile,
      isAuthenticated:true,
      authToken:authToken,
    });
    console.log(profile, authToken);
    this.props.navigation.navigate("Home", {profile:profile, authToken:authToken});
  }
    componentDidMount = () =>{
    this.checkAuthToken();

    // TODO: find better way to wait for checkAuthToken.


  }
  render = ()=>{
    return (
      <View style={styles.container}>
        <View style={styles.splashContainer}>
          <Image
            resizeMode='contain'
            style={styles.logo}
            source={require('./images/hclogo.png')}
          />
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#F9CF00',
    },
    splashContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 75
    },

});
