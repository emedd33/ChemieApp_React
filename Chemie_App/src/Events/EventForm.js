import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

const social_url = 'http://192.168.1.101:8000/api/events/social/register/';
//const bedpress_url =
export default class EventForm extends React.Component{

  constructor(props){
    super(props);
    this.state={
      sleepover_checked:null,
      companion_checked:true,
      companionName:null,
      snack_checked:null,
      AuthToken:props.eventState.AuthToken,

      event_type:"Social",//props.eventState.type,
      event_id:props.eventState.event_id,
      registered:false,
      payed:false,
    }
    this.getEventStatusFromAPI=this.getEventStatusFromAPI.bind(this);
  }
  getEventStatusFromAPI = async() =>{
    console.log("EventForm getEventStatusFromAPI");
    let fetch_url = '22';
    if (this.state.event_type =="Social"){
      fetch_url = social_url.concat(this.state.event_id);
    } else if (this.state.event_type =="BedPress") {
      console.log("blææ");
    }
    console.log(fetch_url);
    console.log(this.state.AuthToken);
    let jsonResponse = await fetch(fetch_url,{
      method:'GET',
      headers:{
        "Authorization": this.state.AuthToken,
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((responseJson)  => {
        let res = JSON.parse(responseJson);
        console.log(res);
        return res;
      })
      .catch((error) => {
         console.error(error);
      });
  }
  componentWillMount(){
    this.getEventStatusFromAPI()
  }
render(){
  var sleepoverCheckboxTitle = <Text></Text>
  var companionCheckboxTitle = <Text></Text>
  var snackCheckBoxTitle = <Text></Text>
  var compantionInputText = <Text></Text>
  var sleepoverCheckbox = <Text>Ingen muligheter for overnatting</Text>
  var companionCheckbox = <Text>Ingen muligheter for følge</Text>
  var snackCheckBox = <Text>Ingen muligheter for snacks</Text>

  if(this.state.sleepover_checked != null){
    sleepoverCheckbox = <CheckBox
      value={this.state.sleepover_checked}
      onValueChange={()=>this.setState({
        sleepover_checked:!this.state.sleepover_checked
      })}

                            />
    sleepoverCheckboxTitle = <Text style={styles.checkboxTitle}>Overnatting</Text>
  }
  if(this.state.companion_checked != null){

    companionCheckbox = <CheckBox
      value={this.state.companion_checked}
      onValueChange={()=>this.setState({
        companion_checked:!this.state.companion_checked
      })}

                        />
    companionCheckboxTitle = <Text style={styles.checkboxTitle}>Følge</Text>
    compantionInputText = <TextInput
      style={styles.compantionInputText}
      autoCapitalize = 'sentences'
      autoCorrect={false}
      returnKeyType='next'
      placeholder = 'Skriv inn navn på følge'
      placeholderTextColor="#707070"
      underlineColorAndroid="transparent"
      onChangeText={(text)=> this.setState({companionName:text})}
                          />
  }
  if(this.state.snack_checked != null){

    snackCheckBox = <CheckBox
      value={this.state.snack_checked}
      onValueChange={()=>this.setState({
        snack_checked:!this.state.snack_checked

      })}

                    />
    snackCheckBoxTitle = <Text style={styles.checkboxTitle}>Nattmat</Text>
  }

  return(

    // TODO: Fix KeyboardAvoidingView
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.defaultDenied}>
        <View style={styles.defaultDeniedUpper} behavior="padding">
          <View style={{flex:1,width:300,paddingTop:10, flexDirection:'row'}}>
            <Image
              source={require('./images/Calendar_icon.png')}
              style={{width:40, height:40}}
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
      <View style={styles.checkboxConatainer}>
        <View style={styles.induvidualCheckboxContainer}>
          {sleepoverCheckbox}
          {sleepoverCheckboxTitle}
        </View>
        <View style={styles.induvidualCheckboxContainer}>
          {snackCheckBox}
          {snackCheckBoxTitle}
        </View>
        <View style={styles.induvidualCheckboxContainer}>
          {companionCheckbox}
          {companionCheckboxTitle}

        </View>
        {compantionInputText}
      </View>
      <View style={styles.submitContainer}>

      </View>




    </KeyboardAvoidingView>
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
  checkboxConatainer:{
    flex:2,
    margin:10,
    backgroundColor:'skyblue',
  },
  induvidualCheckboxContainer:{
    flexDirection:'row',
    marginTop:10,
  },
  checkboxTitle:{
    fontSize:20,
  },
  checkbox:{
    height:80,
    width:80,
  },
  compantionInputText: {
    height:50,
    backgroundColor: '#d1d1d1',
    color: 'black',
    marginTop: 10,
    marginRight:10,
    padding: 10,

    borderColor:'#d1d1d1',
    alignSelf: 'stretch',
  },
  submitContainer:{
    flex:1,
    alignItems:'center',

  }

});
