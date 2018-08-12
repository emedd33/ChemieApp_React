import React from 'react';
import FCM, { NotificationActionType } from "react-native-fcm";

import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';

export default class SettingsPushNotificationScreen extends React.Component{
  static navigationOptions = {
    title: 'Push notification',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
    };
  constructor(props){
    super(props);
    this.state={
      loading:true,
      subscribedToKaffe:false,
      subscribedToEvent:false,
      subscribedToInfo:false,
      profile:this.props.navigation.state.params.state.profile,
      authToken:this.props.navigation.state.params.state.authToken,
    }
    this.editPushNotificationSettings = this.editPushNotificationSettings.bind(this);
  }
  editPushNotificationSettings = async()=>{
    this.setState({
      loading:true,
    })
    try {

    if (this.state.subscribedToKaffe){
      FCM.subscribeToTopic('KAFFE')
    } else {
      FCM.unsubscribeFromTopic('KAFFE')
    }
    if (this.state.subscribedToEvent){
      FCM.subscribeToTopic('EVENT')
    } else {
      FCM.unsubscribeFromTopic('EVENT')
    }
    if (this.state.subscribedToInfo){
      FCM.subscribeToTopic('INFO')
    } else {
      FCM.unsubscribeFromTopic('INFO')
    }
    await AsyncStorage.setItem('fcmKAFFE', JSON.stringify(this.state.subscribedToKaffe));
    await AsyncStorage.setItem('fcmEVENT', JSON.stringify(this.state.subscribedToEvent));
    await AsyncStorage.setItem('fcmINFO', JSON.stringify(this.state.subscribedToInfo));

    Alert.alert("Wop wop", "Innstillingene dine har blitt endret")
  } catch (e) {
    Alert.alert("Ops", "Noe gikk galt" + e)
  }

    this.setState({
      loading:false,
    })

  }
async componentWillMount(){
  this.setState(
    {loading:true}
  )
  let kaffeSubscription = await AsyncStorage.getItem('fcmKAFFE');
  let eventSubscription = await AsyncStorage.getItem('fcmEVENT');
  let infoSubscription = await AsyncStorage.getItem('fcmINFO');

  console.log("EVENT:",eventSubscription);
  console.log("KAFFE:",kaffeSubscription);
  console.log("INFO:", infoSubscription);
  this.setState({
    subscribedToKaffe:JSON.parse(kaffeSubscription),
    subscribedToEvent:JSON.parse(eventSubscription),
    subscribedToInfo:JSON.parse(infoSubscription),
    loading:false,

  })

}
render(){
  return(
    <View style={styles.container}>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text style={{textAlign:'center', fontSize:15}}>Endre på knappene og trykk på submit for å endre innstillinger for pushnotification</Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={{flex:1, fontWeight:'bold'}}>
          Vasler om kaffe
        </Text>
        <Switch
          value={this.state.subscribedToKaffe}
          style={{flex:1}}
          onValueChange={()=>{this.setState({
            subscribedToKaffe:!this.state.subscribedToKaffe
          })}}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={{flex:1,  fontWeight:'bold'}}>
          Vasler om arrangementer
        </Text>
        <Switch
          value={this.state.subscribedToEvent}
          style={{flex:1}}
          onValueChange={()=>{this.setState({
            subscribedToEvent:!this.state.subscribedToEvent
          })}}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={{flex:1,  fontWeight:'bold'}}>
          Generelle vasler
        </Text>
        <Switch
          value={this.state.subscribedToInfo}
          style={{flex:1}}
          onValueChange={()=>{this.setState({
            subscribedToInfo:!this.state.subscribedToInfo
          })}}
        />
      </View>
      <View style={{flex:3, alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={this.editPushNotificationSettings}
        >
          <Text style={styles.submitText}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  switchContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:50,
    marginRight:50,
  },
  submitContainer:{
    marginRight:20,
    marginLeft:20,
    marginTop:10,
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
  submitText:{
    color:'black',
    textAlign:'center',
  },
  loadingContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
  }

});
