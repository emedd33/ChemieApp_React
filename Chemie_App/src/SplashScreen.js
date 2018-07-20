import React from 'react';
import {View, Text, Image, StyleSheet,AsyncStorage, KeyboardAvoidingView} from 'react-native';


export default class splashscreen extends React.Component{
  constructor(props){
    super(props)
    this.checkAuthToken = this.checkAuthToken.bind(this);
    this.state={
      access: false,
      firstScreen:'Login',
    }
  }
  static navigationOptions = {
    title: 'Splash',
    header: null,
  };
  checkAuthToken = async () => {
    try {
      console.log('checkAuthToken');
      let token = await AsyncStorage.getItem('AuthToken');
      // TODO: Find a better conditions to check if token is correct
      if (token !== null && token.length > 20){
          console.log('true');
          this.setState({
            access:true,
            firstScreen:'Home',
          })
      }
    } catch (error) {
      alert(error);
    }


  }
  componentWillMount(){
    console.log('componentWillMount');
    this.checkAuthToken();
  }
  componentDidMount(){
    setInterval(()=>{
      console.log('componentDidMount');
      this.props.navigation.navigate(this.state.firstScreen);
    },2000);
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.splashContainer}>
          <Image
            resizeMode='contain'
            style={styles.logo}
            source={require('./images/hclogo.png')}
          />

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
