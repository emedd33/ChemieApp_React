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


const fetch_url = 'http://192.168.0.17:8000/api/sladreboks/submission/'

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
    console.log(this.state.sladderText)
    console.log(this.state.token);
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
        console.log(res.status);
        res.json();
        this.setState({
          loading:false,
        });
        if (res.status < 300 && res.status >= 200){
          Alert.alert("Sladder sent!", "Sugerpumpa takker deg");
          this.textInput.clear();
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
          onChangeText={(text)=> this.setState({sladderText:text})}
          underlineColorAndroid="transparent"
        >
        </TextInput>
        <TouchableOpacity
          style={styles.sladderSubmit}
          onPress={this.sendSladder}
        >
          <Text>
            Send Sladder
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
      justifyContent: 'center',
      },
    sladderInput:{
      alignSelf: 'stretch',
      backgroundColor:'white',
      height:150,
      margin:20,
      textAlignVertical: 'top',
      padding:5,
      borderRadius:10,
      borderWidth: 1,
    },
    sladderSubmit:{
      backgroundColor:'white',
      alignSelf: 'stretch',
      height:50,
      marginLeft:50,
      marginRight:50,
      borderRadius:10,
      borderWidth: 1,
      alignItems:'center',
      justifyContent: 'center',
    }

});
    /*
        paddingTop:2,
        paddingBottom:2,
        borderRadius:10,
        borderWidth: 1,
        height:150,
        width:40,
        flexGrow: 1,

    },
    input: {
      backgroundColor: 'rgba(225,225,225,0.2)',
      flex:1,
      /*
      color: 'black',
      marginBottom: 10,

      //TODO:This is only Android only, need IOS fix
      textAlignVertical: 'top',



    },
      submit:{
        backgroundColor:'#F9CF00',
        flex:1,
        /*
        marginRight:10,
        marginLeft:10,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,

        borderRadius:10,
        borderWidth: 1,
        borderColor: '#F9CF00',

      },
      submitText:{
        /*color:'#000',
        textAlign:'center',*/
