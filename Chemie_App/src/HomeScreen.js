import React from 'react';
import {View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
} from 'react-native';



export default class HomeScreen extends React.Component{
  static navigationOptions = {
    title: 'Home',
    headerLeft: null
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }

  render(){
    return (

        <View style={styles.homeContainer}>
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={()=>this.props.navigation.navigate('Sladder')}
          >
            <Text
              style={styles.submitText}
            >Sladreboks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitContainer}>
            <Text
              style={styles.submitText}
            >Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitContainer}>
            <Text
              style={styles.submitText}
            >Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitContainer}>
            <Text
              style={styles.submitText}
            >Events</Text>
          </TouchableOpacity>

        </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{

    },
    homeContainer:{
        margin:20,
        marginTop:100,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
        },
    navigationButtons:{
      width:'35%',
      height:'30%',
      margin: 20,
      backgroundColor:'#c1d9ff',
      alignItems:'center',
      justifyContent:'center',
    },
    submitContainer:{
      margin:20,
      width:'35%',
      height:'30%',
      paddingTop:20,
      paddingBottom:20,
      backgroundColor:'#F9CF00',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#F9CF00',
      alignItems:'center',
    },
    submitText:{
      color:'black',
      textAlign:'center',
      justifyContent:'center',
    },

});
