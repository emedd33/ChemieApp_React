import React from 'react';
import {View,Text,Button, TextInput, TouchableOpacity, StyleSheet} from 'react-native';


const url_sladder = 'http://httpbin.org/ip';
const url ='http://192.168.0.17:8000/bucketlists/';
const url_GET ='http://httpbin.org/get';
const url_POST = 'http://httpbin.org/post';
export default class SladderForm extends React.Component{
constructor(props){
    super(props);
    this.sendSladder = this.sendSladder.bind(this);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      fetch_url: "http://192.168.0.17:8000/bucketlists/",
      sladderText: '',
    }
  }

  sendSladder(){
    console.log('posting');
    fetch(url,{
      method:'GET',
      headers:{
        Accept:'application/json',
      },
    }).then((res)=>console.log(res))
  }
  render(){
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize = 'sentences'
          autoCorrect={true}
          returnKeyType='go'
          placeholder = 'Skriv inn sladder'
          onChangeText={(text)=> this.setState({sladderText:text})}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={this.sendSladder  }>
          <Text>Send Sladder</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    constainer:{
      flex:1,
    },
    input: {
      height:120,
      backgroundColor: 'rgba(225,225,225,0.2)',
      color: 'black',
      marginBottom: 10,
      padding: 10,
    },
    buttonContainer:{
      height:80,
      backgroundColor:'#F9CF00',
      paddingVertical: 15,
      margin: 10,
      marginBottom:400,
      alignItems:'center',
      },
  }
);
