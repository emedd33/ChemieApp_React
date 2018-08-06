import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
  BackHandler,
} from 'react-native';

import LoginForm from './LoginForm'

export default class LoginScreen extends React.Component{
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

    //Adding listener to hardware backpress arrow on android devices
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

   //removing backpress listener
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

   //returning true prevents device to go back to splash screen
  handleBackButton() {
    return true;
  }

  openMail(){
    Linking.openURL('mailto:Sugepumpa@hc.ntnu.no?');
  }

  render(){
    return (
      <KeyboardAvoidingView
        style={styles.container}
      >
        <LoginForm navigation={this.props.navigation}/>
        <View style={styles.helpContainer}>
          <Text>Glemt passord eller brukernavn? Ta kontakt: </Text>
          <Text
            style={{color:'blue'}}
            onPress={this.openMail}
          > webkom@hc.ntnu.no</Text>
        </View>
      </KeyboardAvoidingView>
      );
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1
    },
    loginImageContainer:{
        alignItems: 'center',
        flex: 2,
        justifyContent: 'center',
    },
    logingHelpContainer:{
      flex:0.5,
      backgroundColor:"steelblue",
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 150
    },
    helpContainer:{
      flex:0.3,
      marginTop:60,
      alignItems:'center',
      justifyContent: 'center',
    },
});
