import React from 'react';
import * as Progress from 'react-native-progress';

import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import base_params from 'Chemie_App/Params.js';
const social_url = base_params.base_url.concat('/api/events/social/register/');
const social_register_url = base_params.base_url.concat('/api/events/social/register/post/');


//const bedpress_url =
export default class EventForm extends React.Component{

  constructor(props){
    super(props);
    this.state={
      loading:true,

      event_type:props.eventState.type,
      event_id:props.eventState.event_id,

      AuthToken:props.eventState.AuthToken,
      httpStatus:null,

      companion_allowed:props.eventState.event.companion,
      snack_allowed:props.eventState.event.night_snack,
      sleepover_allowed:props.eventState.event.sleepover,

      sleepover_checked:null,
      snack_checked:null,
      companion_checked:null,
      companionNamePlaceholder:"Skriv inn navn på følge",
      companionName:null,

      registered_status:false,
      registered:false,
      payed:false,
    }
    this.getEventStatusFromAPI=this.getEventStatusFromAPI.bind(this);
    this.postEventStatusToAPI = this.postEventStatusToAPI.bind(this);
    this.setCompanionInputText = this.setCompanionInputText.bind(this);
  }
  postEventStatusToAPI = async() => {
    let fetch_url = '';
    if (this.state.event_type =="Social"){
      fetch_url = social_register_url.concat(this.state.event_id);
    } else if (this.state.event_type =="BedPress") {
      console.log("blææ");
    }
    fetch_url = fetch_url.concat('/');
    console.log(fetch_url);

    let jsonResponse = await fetch(fetch_url,{
      method:'POST',
      headers:{
        "Authorization": this.state.AuthToken,
        Accept: "application/json",
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        event:2,
        status:1,
      })
    })
      .then((response) => {

        alert(response.status);
        this.setState({
          httpStatus:response.status,
        })
        return response.text();
      })
      .then((responseJson)  => {
        let res = JSON.parse(responseJson);

        return res;
      })
      .catch((error) => {
         console.error(error);
      });
      if (this.state.httpStatus >= 200 && this.state.httpStatus < 300){
        console.log("Success 2");
      }
  }
  getEventStatusFromAPI = async() =>{
    console.log("EventForm getEventStatusFromAPI");
    let fetch_url = '';
    if (this.state.event_type =="Social"){
      fetch_url = social_url.concat(this.state.event_id);
    } else if (this.state.event_type =="BedPress") {
      console.log("blææ");
    }

    let jsonResponse = await fetch(fetch_url,{
      method:'GET',
      headers:{
        "Authorization": this.state.AuthToken,
      },
    })
      .then((response) => {
        this.setState({
          httpStatus:response.status,
        })
        return response.text();
      })
      .then((responseJson)  => {
        let res = JSON.parse(responseJson);

        return res;
      })
      .catch((error) => {
         console.error(error);
      });
      if (this.state.httpStatus >= 200 && this.state.httpStatus < 300){
        console.log("Success");
        if (jsonResponse.length==1){
          console.log(jsonResponse);
          this.setState({
            registered:true,
            registered_status:jsonResponse[0].status,
            payed:jsonResponse[0].payment_status,
            sleepover_checked:jsonResponse[0].sleepover,
            snack_checked:jsonResponse[0].night_snack,
          });
          if (jsonResponse[0].companion != null && jsonResponse[0].companion != ''){
            this.setState({

              companionName:jsonResponse[0].companion,
              companionNamePlaceholder:jsonResponse[0].companion,
            })
          }
        }

        this.setState({
          loading:false,
        })
      }
  }
  componentWillMount(){
    this.getEventStatusFromAPI()
  }
  setCompanionInputText(){
    if (this.state.companion_checked == true ){
      var companionName = "Skriv inn navn på følge"
      this.setState({
          companionName:companionName,
      })
    }
    this.setState({
      companion_checked:!this.state.companion_checked,

    })}
render(){
  var sleepoverCheckboxTitle = <Text></Text>
  var companionCheckboxTitle = <Text></Text>
  var snackCheckBoxTitle = <Text></Text>
  var compantionInputText = <Text></Text>
  var statusText = <Text>Du er ikke påmeldt</Text>
  var sleepoverCheckbox = <Text>Ingen muligheter for overnatting</Text>
  var companionCheckbox = <Text>Ingen muligheter for følge</Text>
  var snackCheckBox = <Text>Ingen muligheter for snacks</Text>
  var registerText = <Text>Meld meg på</Text>
  var registerTextStatus = <Text></Text>
  var deregistrationButton = <Text></Text>

  if(this.state.sleepover_allowed != null){
    sleepoverCheckbox = <CheckBox
      value={this.state.sleepover_checked}
      title="Overnatting"
      onValueChange={()=>this.setState({
        sleepover_checked:!this.state.sleepover_checked
      })}

                            />
    sleepoverCheckboxTitle = <Text style={styles.checkboxTitle}>Overnatting</Text>
  }
  if(this.state.snack_allowed != null){

    snackCheckBox = <CheckBox
      value={this.state.snack_checked}
      onValueChange={()=>this.setState({
        snack_checked:!this.state.snack_checked

      })}

                    />
    snackCheckBoxTitle = <Text style={styles.checkboxTitle}>Nattmat</Text>
  }
  if(this.state.companion_allowed != null){

    companionCheckbox = <CheckBox
      value={
          this.state.companion_checked
      }
      onValueChange={this.setCompanionInputText}
                        />
        companionCheckboxTitle = <Text style={styles.checkboxTitle}>Følge</Text>
        compantionInputText = <TextInput
          style={styles.compantionInputText}
          autoCapitalize = 'sentences'
          autoCorrect={false}
          returnKeyType='next'
          placeholder = {this.state.companionNamePlaceholder}
          placeholderTextColor="#707070"
          underlineColorAndroid="transparent"
          onChangeText={(text)=> this.setState({companionName:text})}
                              />
      }

  if (this.state.registered){
    registerText = <Text>Endre registrasjon</Text>
    switch (this.state.registered_status) {
      case 2:
        registerTextStatus = <Text style={{color:'grey', fontSize:20}}>Du er på venteliste</Text>
        break;
      case 3:
        registerTextStatus = <Text style={{color:'grey', fontSize:20}}>Du viser interesse</Text>
        break;
      default:
        registerTextStatus = <Text style={{color:'green', fontSize:20}}>Du er påmeldt</Text>
    }
    deregistrationButton =
    <TouchableOpacity
      style={styles.submitButton}

    >
      <Text style={{color:'red'}}>Meld meg av</Text>
    </TouchableOpacity>

  }

  if(this.state.loading){
        return(
          <View style={styles.loadingContainer}>
            <Progress.Circle size={80} indeterminate={true} color="black" />
          </View>
        );
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
        <View style={{alignItems:'center',justifyContent:'center'}}>
          {registerTextStatus}

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
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.postEventStatusToAPI}
          >
            {registerText}

          </TouchableOpacity>
          {deregistrationButton}

        </View>




    </KeyboardAvoidingView>
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
    justifyContent:'center',
    flexDirection:'row'

  },
  submitButton:{
    flex:1,
    alignSelf:'stretch',
    justifyContent:'center',
    alignItems:'center',
    margin:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
    borderColor:'transparent',
    borderRadius:10,
    borderWidth: 1,
  },


});
