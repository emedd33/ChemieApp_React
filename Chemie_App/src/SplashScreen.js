import React from 'react';
import {View, Text, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';


export default class splashscreen extends React.Component{
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    title: 'Splash',
    header: null,
  };
  componentWillMount(){
    //setInterval(()=>{
      //this.props.navigation.navigate('Login');
    //},2000);
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.splashContainer}>
          <Image
            resizeMode='contain'
            style={styles.logo}
            source={require('./hclogo.png')}
          />
          <Text onPress={()=>this.props.navigation.navigate('Login')}>Press</Text>
        </View>


      </View>
      );
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#F9CF00',
    },
    splashContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {

        width: 150,
        height: 75
    },

});
