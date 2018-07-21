import React from 'react';
import {View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';

import SladderForm from './SladderForm';


export default class SladderScreen extends React.Component{
  static navigationOptions = {
    title: 'Sladder',
    };
  
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Send gjerne inn sitater, rykter eller tilbakemeldinger til Sugepumpa.
            {"\n"}For spørsmål kontakt Sugepumpa@hch.ntnu.no
          </Text>
        </View>
        <SladderForm/>
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
      flex: 1,
      alignItems:'center',
      justifyContent: 'center',
      margin:10,
    },
    titleText:{

    },
});
