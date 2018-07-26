import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class EventClosed extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.eventState;
  }

render(){
  // TODO: Add refresh button
  return(
    <View style={styles.container}>
      <View style={styles.defaultDenied}>
        <View style={styles.defaultDeniedUpper}>
          <View style={{flex:1,width:300,paddingTop:10, flexDirection:'row'}}>
            <Image
              source={require('./images/Calendar_icon.png')}
              style={{width:40, height:40}}
            />
            <Text style={{fontSize:20, paddingTop:10}}>Datoer</Text>
          </View>

          <View style={{flex:1.5  , width:300}}>
            <Text>{this.state.closed_text}</Text>
            <Text style={{marginTop:10}}>Open: {this.state.timeTillopen}</Text>
          </View>
        </View>
        <View style={styles.defaultDeniedLower}>
          <View style={{flexDirection:'row',width:300}}>
            <Text>Påmeldingen åpner: </Text><Text style={{position:'absolute', right:0}}>{this.state.register_open_date}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text>Påmeldingsfrist:</Text><Text style={{position:'absolute', right:0}}>{this.state.register_closed_date}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text>Avmeldingsfrist:</Text><Text style={{position:'absolute', right:0}}>{this.state.register_deadline_date}</Text>
          </View>
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
    height:200,
    alignItems:'center',
    justifyContent: 'center',

  },
  defaultDeniedUpper:{
    flex:2,

  },
  defaultDeniedLower:{
    flex:1,
  },

});
