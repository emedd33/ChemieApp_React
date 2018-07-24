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

import SladderForm from './SladderForm';


export default class SladderScreen extends React.Component{
  constructor(props){
    super(props);
    this.openMail=this.openMail.bind(this);
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
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Send gjerne inn sitater, rykter eller tilbakemeldinger til NTNUs beste linjeforeningsavis.
          </Text>
        </View>
        <SladderForm/>
        <View style={styles.helpContainer}>
          <Text>For spørsmål kontakt </Text>
          <Text
            style={styles.mailText}
            onPress={this.openMail}
          > Sugepumpa@hc.ntnu.no</Text>
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
      margin:5,
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
