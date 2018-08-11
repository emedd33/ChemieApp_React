import React from 'react';
import * as Progress from 'react-native-progress';

import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Switch,
  TouchableOpacity,
  AsyncTask,
  Alert,
} from 'react-native';

import base_params from 'ChemieApp/Params.js';


export default class EventFormSubmit extends React.Component{
  constructor(props){
    super(props);
    this.state = props.eventState;
    var optionContainerFlexSize = 0.5;
    var submitContainerFlexSize = 1;
    this.registerToEvent = this.registerToEvent.bind(this);
  }
  handleCheckBox(body){
    this.setState(body)
    this.props.updateParentState(body)
  }
  registerToEvent(){
    if(this.state.register_closed){
      Alert.alert("Ups","Arrangementets påmeldingsfrist har utløpts.")
    } else {
      this.props.postEventStatusToAPI()
    }

  }
render(){

  var sleepoverCheckboxTitle = <Text></Text>
  var sleepoverCheckbox = <Text></Text>

  var snackCheckBoxTitle = <Text></Text>
  var snackCheckBox = <Text></Text>

  var companionInputText = <Text></Text>
  var compoanionHelpText = <Text></Text>

  if(this.state.sleepover_allowed){
    this.optionContainerFlexSize += 0.5;
    this.submitContainerFlexSize -=0.125;
    sleepoverCheckbox = <Switch
      title='Overnatting'
      value={this.state.sleepover_checked}
      onValueChange={()=>{this.handleCheckBox({sleepover_checked:!this.state.sleepover_checked})}}
                        />
      sleepoverCheckboxTitle = <Text style={styles.checkboxTitle}>Overnatting</Text>
    }
  if(this.state.snack_allowed){
    this.optionContainerFlexSize += 0.5;
    this.submitContainerFlexSize -=0.125;
      snackCheckBox = <Switch
        value={this.state.snack_checked}
        onValueChange={()=>{this.handleCheckBox({snack_checked:!this.state.snack_checked})}}

                      />
      snackCheckBoxTitle = <Text style={styles.checkboxTitle}>Nattmat</Text>
    }
  if(this.state.companion_allowed){
      this.submitContainerFlexSize -=0.25;
      this.optionContainerFlexSize += 1;
      compoanionHelpText = <Text style={{textAlign:'center', fontSize:10}}>
        Navn på ekstern person. Ønske om bordkavaler sendes til arrangør.
      </Text>

      companionInputText = <TextInput
        style={styles.companionInputText}
        autoCapitalize = 'sentences'
        autoCorrect={false}
        returnKeyType='next'
        placeholder = {this.state.companionNamePlaceholder}
        placeholderTextColor="#707070"
        underlineColorAndroid="transparent"
        onChangeText={(text)=> this.props.updateParentState({companionName:text})}
                           />
      }

  if (this.state.loading){
    return(
      <View style={styles.loadingContainer}>
        <Progress.Circle size={80} indeterminate={true} color="black" />
      </View>
    );

  }
  return(
    <KeyboardAvoidingView
      style={styles.container}
    behavior="padding">
      <View style={styles.defaultDenied}>
        <View style={styles.defaultDeniedUpper} >
          <View style={{flex:1,width:300,paddingTop:10, flexDirection:'row'}}>
            <Image
              source={require('ChemieApp/src/Events/images/Calendar_icon.png')}
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
      <View style={styles.optionsConatainer}>

        {companionInputText}
        {compoanionHelpText}

        <View style={styles.induvidualCheckboxContainer}>
          {sleepoverCheckbox}
          {sleepoverCheckboxTitle}
        </View>
        <View style={styles.induvidualCheckboxContainer}>
          {snackCheckBox}
          {snackCheckBoxTitle}
        </View>
      </View>
      <View style={styles.submitConatainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.registerToEvent}
        >
          <Text style={{fontSize:20}}>Meld meg på</Text>

        </TouchableOpacity>
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
    optionsConatainer:{
      flex:this.optionContainerFlexSize,
      margin:10,

    },
      checkboxConatainer:{
        flex:1,
        margin:10,
      },
        induvidualCheckboxContainer:{
          flexDirection:'row',
          marginTop:10,

        },
        checkboxTitle:{
          fontSize:20,
        },
      companionInputText: {
        height:50,
        backgroundColor: '#d1d1d1',
        color: 'black',
        marginTop: 10,
        marginLeft:10,
        marginRight:10,
        padding: 10,
        borderRadius:10,
        borderWidth: 1,
        borderColor:'#d1d1d1',
        alignSelf: 'stretch',

        borderColor:'#d1d1d1',
        alignSelf: 'stretch',
      },
    submitConatainer:{
      flex:this.submitContainerFlexSize,
      marginTop:10,
      marginBottom:10,

    },
      submitButton:{
        marginRight:20,
        marginLeft:20,
        alignSelf: 'stretch',
        backgroundColor:'#F9CF00',
        borderRadius:10,
        height:50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#F9CF00',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 2,
      },


});
