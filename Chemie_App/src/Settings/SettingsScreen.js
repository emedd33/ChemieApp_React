import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';

export default class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.logoutPress=this.logoutPress.bind(this);
    this.logoutSubmit=this.logoutSubmit.bind(this);
  }
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
  };
  logoutPress(){

  Alert.alert(
  'Sign out',
  'Sikker på at du vil logge ut?',
  [
    {text: 'Nei', style: 'cancel' },
    {text: 'Ja', onPress: () => {
    this.logoutSubmit()
    .then(this.props.navigation.navigate('Login'))},
  }
  ],
  { cancelable: true }
)
  }
  logoutSubmit = async() => {


    try{
      // TODO: remove other prefferences
      await AsyncStorage.removeItem('AuthToken');
      console.log("logging out");

    } catch (error) {
      alert(error);
      AsyncStorage.clear()
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text
          >SettingsForm</Text>
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={this.logoutPress}
          >
            <Text
              style={styles.buttonText}
            >Logout</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  formContainer:{
    flex:2,
    backgroundColor:"skyblue",
    justifyContent:'center',
    alignItems:'center',
  },
  logoutContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  logoutButton:{
    backgroundColor:'red',
    borderRadius:20,
    borderWidth: 1,
    borderColor:"red",
    alignSelf: 'stretch',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    margin:50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText:{
    color:'white',
  }
});
