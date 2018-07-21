import React from 'react';
import {View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
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
  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.loginContainer}>
          <Image
            resizeMode='contain'
            style={styles.logo}
            source={require('./images/hclogo.png')} />
        </View>
        <View style={styles.formConatiner}>
          <LoginForm navigation={this.props.navigation}/>
        </View>
      </KeyboardAvoidingView>
        );
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1
    },
    buttonContainer:{
      backgroundColor:'#F9CF00',
      paddingVertical: 15,
      },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 300,
        height: 150
    },
});
