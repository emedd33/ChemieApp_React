import React from 'react';
import {View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Linking,
} from 'react-native';

import LoginForm from './LoginForm'

export default class LoginScreen extends React.Component{
  static navigationOptions = {
    title: 'Login',
    header: null,
    };
  componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
        return true;
  }
  openMail(){
  Linking.openURL('mailto:Sugepumpa@hc.ntnu.no?');
  }
  render(){
    return (
      <View
        style={styles.container}
      >
        <View style={styles.loginImageContainer}>
          <Image
            resizeMode='contain'
            style={styles.logo}
            source={require('./images/hclogo.png')} />
          
        </View>
        <LoginForm navigation={this.props.navigation}/>
        <View style={styles.helpContainer}>
          <Text>For spørsmål kontakt </Text>
          <Text
            style={styles.mailText}
            onPress={this.openMail}
          > webkom@hc.ntnu.no</Text>
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1
    },
    loginImageContainer:{
        alignItems: 'center',
        flex: 0.7,
        marginTop:20,
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
      alignItems:'center',
      justifyContent: 'center',
    },
    mailText:{
      color:'blue',
    },
});
