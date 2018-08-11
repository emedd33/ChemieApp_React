import React from 'react';
import * as Progress from 'react-native-progress';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class EventClosed extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.eventState;

  }

render(){
  if (this.state.loading) {
    return(
      <View style={styles.loadingContainer}>
        <Progress.Circle size={80} indeterminate={true} color="black" />
      </View>
    );
  }
  return(
    <View style={styles.container}>
      <View style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
        <Text style={{fontSize:20}}>
          Påmeldingen har ikke åpnet
        </Text>
      </View>
      <View style={styles.defaultDenied}>
        <View style={styles.defaultDeniedUpper}>
          <View style={{flex:1,width:300, flexDirection:'row'}}>
            <Image
              source={require('ChemieApp/src/Events/images/Calendar_icon.png')}
              style={{width:40, height:40, marginTop:5, marginRight:25}}
            />
            <Text style={{fontSize:30}}>Datoer</Text>
          </View>

          <View style={{flex:1.5  , width:300, justifyContent:'center', alignItems:'center'}}>
            <Text style={{marginTop:10, fontSize:20}}>Åpner {this.state.time_until_open}</Text>

          </View>
        </View>
        <View style={styles.defaultDeniedLower}>
          <View style={{flexDirection:'row',width:300}}>
            <Text>Påmelding: </Text><Text style={{position:'absolute', right:0}}>{this.state.register_open_date}</Text>
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
  loadingContainer:{
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
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
    height:170,
    alignItems:'center',
    justifyContent: 'center',

  },
  defaultDeniedUpper:{
    flex:2,

  },
  defaultDeniedLower:{
    flex:1,
    marginBottom:10
  },


});
