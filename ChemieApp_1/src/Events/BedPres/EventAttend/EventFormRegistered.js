import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
} from 'react-native';

import base_params from 'ChemieApp/Params.js';

export default class EventFormRegistered extends React.Component{
  constructor(props){
    super(props);
    this.state = props.eventState;
    this.paymentcolor = 'green';
    this.handelUrlClick = this.handelUrlClick.bind(this);
  }
  handelUrlClick(){
    let url = base_params.bedpres_event_url;
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: ");
        }
      });
    }
render(){
  var registerstatus = <Text style={{fontSize:20, color:'green', marginTop:10}}>Du er påmeldt</Text>
  switch (this.state.registered_status) {
    case 2:
      registerstatus = <Text style={{fontSize:20, color:'grey',marginTop:10}}>Du er på venteliste</Text>
      break;
    case 3:
      registerstatus = <Text style={{fontSize:20, color:'grey',marginTop:10}}>Du er på interesseliste</Text>
      break;
    default:
      break;
  }

  var paymentStatus = <Text>Gratis</Text>
  var paymentImage = <Image
    source={require('ChemieApp/src/Events/images/Check_icon.png')}
    style={{width:40, height:40}}
                     />



  return(
    // TODO: The dates and time in the deniedContainer are off.
    <View style={styles.container}>
      <View style={styles.defaultDenied}>
        <View style={styles.defaultDeniedUpper} >
          <View style={{flex:1,width:300,paddingTop:10, flexDirection:'row'}}>
            <Image
              source={require('ChemieApp/src/Events/images/Calendar_icon.png')}
              style={{width:50, height:50}}
            />
            <Text style={{fontSize:20, paddingTop:10}}>Datoer</Text>
          </View>
        </View>
        <View style={styles.defaultDeniedLower}>
          <View style={{flexDirection:'row',width:300}}>
            <Text>Påmeldingen åpnet: </Text><Text style={{position:'absolute', right:0}}>{this.props.eventState.register_open_date}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text>Påmeldingsfrist:</Text><Text style={{position:'absolute', right:0}}>{this.props.eventState.register_closed_date}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text>Avmeldingsfrist:</Text><Text style={{position:'absolute', right:0}}>{this.props.eventState.register_deadline_date}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statusContainer}>
        {registerstatus}
        <View style={styles.paymentContainer}>
          <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:15, textAlign:'center'}}>Status på betaling: </Text>
          </View>
          <View style={{flex:1, justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
            <Text>{paymentStatus}</Text>
            <View style={{
              backgroundColor:this.paymentcolor,
              borderColor:this.paymentcolor,
              borderRadius:10,
              borderWidth: 1,
              padding:5,
              justifyContent:'center',
              alignItems:'center'
            }}>
              {paymentImage}
            </View>
          </View>
        </View>
        <View style={{justifyContent:'center',alignItems:'center', marginTop:20}}>
          <Text style={{fontSize:10}}>Avmelding eller endring av registrering gjøres på chemie.no </Text>
          <Text
            onPress={this.handelUrlClick}
            style={{color:'blue', marginTop:10, fontSize:15}}
          > Gå til events</Text>
        </View>
      </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },

  defaultDenied:{
    margin:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
    borderColor:'transparent',
    borderRadius:10,
    borderWidth: 1,
    height:150,
    alignItems:'center',
    justifyContent: 'center',
    },
    defaultDeniedUpper:{
      flex:1,
    },
    defaultDeniedLower:{
      flex:1,
    },
  statusContainer:{
    justifyContent:'center',
    alignItems:'center',
  },
  paymentContainer:{
    marginTop:40,
    flexDirection:'row',
    borderColor:'transparent',
    borderRadius:10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
    width:300,
    height:80,
    },

});
