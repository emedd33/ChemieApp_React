import React from 'react';
import {View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Linking,
  Keyboard,
} from 'react-native';

import SladderForm from './SladderForm';

// TODO: Check if user has selected multiple images
// TODO: check if it's possible to send video
export default class SladderScreen extends React.Component{
  constructor(props){
    super(props);
    this.openMail=this.openMail.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this.state = {
      keyboardShown:false,
      authToken:props.navigation.state.params.authToken,
    }
  }
  static navigationOptions = {
    title: 'Sladder',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
    };
    openMail(){
      Linking.openURL('mailto:Sugepumpa@hc.ntnu.no?');
    }
    componentDidMount () {
       this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
       this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    //Removing listener for textinput press
    componentWillUnmount () {
       this.keyboardDidShowListener.remove();
       this.keyboardDidHideListener.remove();
     }

     //Removing HC-logo when Keyboard is shown
    _keyboardDidShow () {
      this.setState({
        keyboardShown:true,
      });
     }

     //re-renders HC-logo when keyboard is hidden
    _keyboardDidHide () {
      this.setState({
        keyboardShown:false,
      });
     }
  render(){
    let helpText = <Text>For spørsmål kontakt </Text>
    let helpMail = <Text style={styles.mailText} onPress={this.openMail}> Sugepumpa@hc.ntnu.no</Text>
    if (this.state.keyboardShown){
      helpText = <Text></Text>
      helpMail = <Text></Text>
    }
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Send gjerne inn sitater, rykter eller tilbakemeldinger til NTNUs beste linjeforeningsavis.
          </Text>
        </View>

        <SladderForm authToken={this.state.authToken}/>
        <View style={styles.helpContainer}>
          {helpText}
          {helpMail}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    titleContainer:{
      flex: 0.7,
      alignItems:'center',
      justifyContent: 'center',
      margin:10,
    },
    titleText:{
      textAlign:'center',
    },
    helpContainer:{
      flex:0.5,
      alignItems:'center',
      justifyContent: 'center',
    },
    mailText:{
      color:'blue',
    },
});
