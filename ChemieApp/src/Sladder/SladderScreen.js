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

    //Open default mailing client for sending mail
    openMail(){
      Linking.openURL('mailto:Sugepumpa@hc.ntnu.no?');
    }
    //Adding listerer function to run when keyboard is shown or hidden
    componentDidMount () {
       this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
       this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    //Removing listener for textinput press
    componentWillUnmount () {
       this.keyboardDidShowListener.remove();
       this.keyboardDidHideListener.remove();
     }

     //Removing components like webkom mail when Keyboard is shown
    _keyboardDidShow () {
      this.setState({
        keyboardShown:true,
      });
     }

     //re-renders webkom mail when keyboard is hidden
    _keyboardDidHide () {
      this.setState({
        keyboardShown:false,
      });
     }
  render(){

    //keyboard is shown renders two different components
    let helpText = <Text>For spørsmål kontakt </Text>
    let helpMail = <Text style={styles.mailText} onPress={this.openMail}> Sugepumpa@hc.ntnu.no</Text>
    //removes text if keyboard is shown
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
