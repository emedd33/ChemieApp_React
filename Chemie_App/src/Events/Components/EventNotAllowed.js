import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class EventNotAllowed extends React.Component{

  constructor(props){
    super(props);
  }
render(){
  return(
    <View style={styles.container}>
      <View style={styles.defaultDenied}>
        <View style={styles.upperDenied}>
          <Image
            source={require('../images/Sadface_icon.png')}
            style={{width:60, height:60}}
          />
        </View>
        <View style={styles.lowerDenied}>

          <Text>
            Ditt klassetrinn er ikke invitert til dette arrangementet.
            Du kan fortsatt melde din interesse på chemie.no dersom det åpnes plasser.
          </Text>

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
    backgroundColor:'#F8DC4D',

  },
  upperDenied:{
    flex:1,
    width:300,
    marginTop:40,
    alignItems:'center',
    justifyContent: 'center',
  },
  lowerDenied:{
    flex:2,
    width:300,
    padding:10,
    margin:20,
    alignItems:'center',
    justifyContent: 'center',
  }

});
