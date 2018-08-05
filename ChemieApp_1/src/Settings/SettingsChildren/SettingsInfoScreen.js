import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class SettingsInfoScreen extends React.Component{
  static navigationOptions = {
    title: 'Info',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
    };
  constructor(props){
    super(props);
    this.openEskildMail = this.openEskildMail.bind(this);
    this.openWebkomMail = this.openWebkomMail.bind(this);
    this.handelUrlClick = this.handelUrlClick.bind(this);
  }
  openWebkomMail(){
  Linking.openURL('mailto:webkom@hc.ntnu.no?');
  }
  openEskildMail(){
  Linking.openURL('mailto:eskild.emedd33@gmail.com?');
  }
  handelUrlClick(){
    Linking.canOpenURL('https://github.com/emedd33/ChemieApp_React').then(supported => {
        if (supported) {
          Linking.openURL('https://github.com/emedd33/ChemieApp_React');
        }
      });
    }
render(){
  return(
    <View style={styles.container}>
      <View style={{flex:1, margin:20}}>
        <Text style={{fontSize:20, fontWeight:'bold'}}>Om ChemieApp:</Text>
        <Text>
          Dette er en app som er ment som et alternativ til nettsidene til Høiskolens Chemikerforening.
          Siden appen er i tidlig fase vil ikke webkom garantere at appen er optimalisert
          og at alle funksjoner vil fungere for alle enheter. Samtidig oppfordrer vi til å sende
          inn alle feilmeldinger med vedlagt skjermbilde og/eller forklaring til webkom så vi raskt kan komme med oppdateringer.
        </Text>
        <Text
          style={{color:'blue'}}
          onPress={this.openWebkomMail}
        >webkom@hc.ntnu.no</Text>
      </View>

      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontWeight:'bold'}}>
          Laget av og eier av opphavsrett:
        </Text>
        <Text style={{marginTop:10}}>
          Eskild Ruud Mageli
        </Text>
        <Text
          style={{color:'blue', marginTop:10}}
          onPress={this.openEskildMail}
        >
          eskild.emedd33@gmail.com
        </Text>
        <TouchableOpacity
          onPress={this.handelUrlClick}
        >
          <Image
            resizeMode='contain'
            style={{width:50, height:50, marginTop:10}}
            source={require('ChemieApp/src/Settings/images/Github_icon.png')}
          />
        </TouchableOpacity>

        {/*




        */}
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },

});
