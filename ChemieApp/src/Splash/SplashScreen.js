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
      }
    } catch (error) {
      alert(error);
    }
  }
  getAsyncStorageSettings = async() => {
    let authToken = await AsyncStorage.getItem('AuthToken');
    let firstname = await AsyncStorage.getItem('Firstname');
    let lastname = await AsyncStorage.getItem('Lastname');
    let access_card = await AsyncStorage.getItem('access_card');
    let grade = await AsyncStorage.getItem('grade');
    let username = await AsyncStorage.getItem('username');
    let id = await AsyncStorage.getItem('id');
    profile = {

      firstname:firstname,
      lastname:lastname,
      access_card:access_card,
      grade:grade,
      username:username,
      id:id,
    }
    this.setState({
      profile:profile,
      isAuthenticated:true,
      authToken:authToken,
    });
  }
    componentDidMount = () =>{
    this.checkAuthToken();

    // TODO: find better way to wait for checkAuthToken.
    setTimeout(()=>{

      if (this.state.isAuthenticated){
        this.props.navigation.navigate("Home", {profile:this.state.profile, authToken:this.state.authToken});
      } else {
        this.props.navigation.navigate("Login");
      }
    }, 2000);

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
