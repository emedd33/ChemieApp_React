import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Clipboard,
  Platform,
  Listeners,
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import FCM, { NotificationActionType } from "react-native-fcm";

import { registerKilledListener, registerAppListener } from "./FCM/Listeners";
import firebaseClient from "./FCM/FirebaseClient";


import HomeScreen from './src/Home/HomeScreen';
import LoginScreen from './src/Login/LoginScreen';
import NotificationScreen from './src/Notification/NotificationScreen';
import SplashScreen from './src/Splash/SplashScreen';
import SladderScreen from './src/Sladder/SladderScreen';

import SettingsScreen from './src/Settings/SettingsScreen';
import SettingsEmailScreen from './src/Settings/SettingsChildren/SettingsEmailScreen';
import SettingsInfoScreen from './src/Settings/SettingsChildren/SettingsInfoScreen';
import SettingsPushNotificationScreen from './src/Settings/SettingsChildren/SettingsPushNotificationScreen';
import SettingsGeneralScreen from './src/Settings/SettingsChildren/SettingsGeneralScreen';

import EventScreen from './src/Events/EventScreen';
import EventDetailScreenSocial from './src/Events/Social/EventDetailScreenSocial';
import EventAttendScreenSocial from './src/Events/Social/EventAttend/EventAttendScreenSocial';
import EventDetailScreenBedPres from './src/Events/BedPres/EventDetailScreenBedPres';
import EventAttendScreenBedPres from './src/Events/BedPres/EventAttend/EventAttendScreenBedPres';

export default class App extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: "",
     tokenCopyFeedback: ""
   };
 }
  async componentDidMount() {
   FCM.createNotificationChannel({
     id: 'default',
     name: 'Default',
     description: 'used for example',
     priority: 'high'
   })
   registerAppListener(this.props.navigation);
   FCM.getInitialNotification().then(notif => {
     this.setState({
       initNotif: notif
     });
     if (notif && notif.targetScreen === "detail") {
       setTimeout(() => {
         this.props.navigation.navigate("Detail");
       }, 500);
     }
   });

   try {
     let result = await FCM.requestPermissions({
       badge: false,
       sound: true,
       alert: true
     });
   } catch (e) {
     console.error(e);
   }

   FCM.getFCMToken().then(token => {
     console.log("TOKEN (getFCMToken)", token);
     this.setState({ token: token || "" });
   });

   if (Platform.OS === "ios") {
     FCM.getAPNSToken().then(token => {
       console.log("APNS TOKEN (getFCMToken)", token);
     });
   }


 }
  render(){
    return (
      <ChemieApp/>
    );
  }
}

// TODO: Figure out if we need landscapemode, currently disabled
// TODO: Fix splash from from preventing navigation from login to home
// TODO: remove navigation from home to login or loging to splash with back arrow
// TODO: Change style to be relative size to size of phone/tablet
// TODO: Add documentation
const ChemieApp = createStackNavigator({


    Splash:{screen: SplashScreen},
    Login:{screen: LoginScreen},
    Home:{screen: HomeScreen},
    Sladder:{screen:SladderScreen},
    Notification: {screen: NotificationScreen},

    Settings: {screen: SettingsScreen},
    SettingsGeneral: {screen: SettingsGeneralScreen},
    SettingsEmail: {screen: SettingsEmailScreen},
    SettingsInfo: {screen: SettingsInfoScreen},
    SettingsPushNotification: {screen: SettingsPushNotificationScreen},

    Events: {screen: EventScreen},
    EventDetailScreenSocial: {screen: EventDetailScreenSocial},
    EventAttendSocial: {screen:EventAttendScreenSocial},
    EventDetailScreenBedPres: {screen: EventDetailScreenBedPres},
    EventAttendBedPres: {screen:EventAttendScreenBedPres},




  },{
    //headerMode: 'none'
});
