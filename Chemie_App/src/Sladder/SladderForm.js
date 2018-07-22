import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';


const fetch_url = "http://192.168.0.17:8000/api/sladreboks/submission/"

export default class SladderForm extends React.Component{
constructor(props){
    super(props);
    this.sendSladder = this.sendSladder.bind(this);
    this.checkAuthToken = this.checkAuthToken.bind(this);
    this.state = {
      loading: false,
      error: null,
      refreshing: false,
      sladderText: '',
      token: 'token ',
    }
  }
  checkAuthToken = async () => {
    try {
      console.log('SladderForm checkAuthToken');
      let token = await AsyncStorage.getItem('AuthToken');

      // TODO: Find a better conditions to check if token is correct
      if (token !== null && token.length > 20){
          let tokenPlaceholder = this.state.token;
          let newToken = tokenPlaceholder.concat(token);
          this.setState({
            access:true,
            token:newToken,
          })
      }
    } catch (error) {
      alert(error);
    }


  }
  componentWillMount(){
    console.log('SladderForm componentWillMount');
    this.checkAuthToken();
  }
  componentDidMount(){
    console.log('SladderForm componentDidMount');
  }
  sendSladder(){



    // TODO: add sendImage

    this.setState({
      loading:true
    });

    if(this.state.sladderText != ''){
      fetch(fetch_url,{
        method:'POST',
        headers:{
          "Authorization": this.state.token,
          Accept: "application/json",
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          content:this.state.sladderText,
        }),
      })
      .then((res)=>{
        this.setState({
          loading:false,
        });
        if (res.status < 300 && res.status >= 200){
          this.textInput.clear();
          Alert.alert("Sladder sent!", "Sugerpumpa takker deg");
        } else {
          throw res.status;
        }
      })

      .catch((error) => {
       this.setState({
         loading : false });
      Alert.alert(
        "Noe gikk galt",
        error);
     });

   }
  }
  render(){
    return(
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <TextInput
          style={styles.sladderInput}
          multiline={true}
          numberOfLines={2}
          autoCorrect={true}
          autoCapitalize = 'sentences'
          returnKeyType='go'
          placeholder = 'Skriv inn sladder'
          ref={input => { this.textInput = input }}
          onChangeText={(text)=> this.setState({sladderText:text})}

          // TODO: Andriod only, must check IOS
          underlineColorAndroid="transparent"
        >
        </TextInput>
        <TouchableOpacity
          style={styles.sladderSubmit}
          onPress={this.sendSladder}
        >
          <Text>
            Send
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 3,
      alignItems:'center',
      },
    sladderInput:{
      alignSelf: 'stretch',
      backgroundColor:'white',
      height:150,
      textAlignVertical: 'top',
      padding:5,
      borderRadius:10,
      borderWidth: 1,
      margin:10,
      marginBottom:20,
    },
    sladderSubmit:{
      backgroundColor:'#F9CF00',
      alignSelf: 'stretch',
      height:50,
      marginLeft:50,
      marginRight:50,
      borderRadius:10,
      borderWidth: 1,
      borderColor:'#d1d1d1',
      alignItems:'center',
      justifyContent: 'center',
    }

});
