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
      respons: null,
      error: null,
      refreshing: false,
      fetch_url: 'http://192.168.0.17:8000/bucketlists/',
      sladderText: '',
    }
  }

  sendSladder(){
    this.setState({
      loading:true
    });
    console.log(this.state.sladderText)
    if(this.state.sladderText != ''){
      fetch(url,{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          name:this.state.sladderText,
        }),
      })

      .then((res)=>{
        console.log(res.status);
        res.json();
        this.setState({
          loading:false,
          respons:201,
        });
      })

      .catch((error) => {
       this.setState({
         error:error,
         loading : false });
     });
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.sladderConatainer}>
          <TextInput
            style={styles.input}
            /*TODO: Må fjernes i IOS*/
            underlineColorAndroid="transparent"
            autoCapitalize = 'sentences'
            autoCorrect={true}
            returnKeyType='go'
            placeholder = 'Skriv inn sladder'
            onChangeText={(text)=> this.setState({sladderText:text})}
          />
        </View>
          <TouchableOpacity style={styles.submit} onPress={this.sendSladder  }>
          <Text style={styles.submitText}>
            Send Sladder
          </Text>
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
    sladderConatainer:{
      borderColor: 'black',
        marginRight:10,
        marginLeft:10,
        marginTop:10,
        paddingTop:2,
        paddingBottom:2,
        borderRadius:10,
        borderWidth: 1,
    },
    input: {
      height:120,
      backgroundColor: 'rgba(225,225,225,0.2)',
      color: 'black',
      marginBottom: 10,
      padding: 10,
      textAlignVertical: 'top',
      /*TODO:This is only Android only, need IOS fix*/

    },
      submit:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#68a0cf',
        borderRadius:10,
        borderWidth: 1,
        borderColor: 'white'
      },
      submitText:{
        color:'#fff',
        textAlign:'center',
      },
  }
);
