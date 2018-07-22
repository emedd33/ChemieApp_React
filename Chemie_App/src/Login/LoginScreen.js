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
});
