import React from 'react';
import {View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  AsyncStorage,
} from 'react-native';

import News from './News';

export default class HomeScreen extends React.Component{
  constructor(props){
    super(props);
    //this.getToken = this.getToken.bind(this);
    this.state = {
      loading:false
    }

  }
  static navigationOptions = {
    title: 'Home',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
    headerTitle: (
      <Image
        source={require('./images/hclogo_headerIcon.png')}
        style={{width:50, height:50, marginLeft:10,        }}
      />
  ),
  };
  componentWillMount(){
    console.log("Home componentWillMount");
    //this.getToken()
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }


  render(){
    return (
        <View style={styles.container}>
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={()=>this.props.navigation.navigate('Sladder')}
            >
              <Image
                resizeMode='contain'
                style={styles.SladderLogo}
                source={require('./images/Gossip_icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitContainer}
              onPress={()=>this.props.navigation.navigate('Notification')}
            >
              <Image
                resizeMode='contain'
                style={styles.SladderLogo}
                source={require('./images/Coffee_icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitContainer}
              onPress={()=>this.props.navigation.navigate('Events')}
            >
              <Image
                resizeMode='contain'
                style={styles.SladderLogo}
                source={require('./images/Party_icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitContainer}
              onPress={()=>this.props.navigation.navigate('Settings')}
            ><Image
              resizeMode='contain'
              style={styles.SladderLogo}
              source={require('./images/Settings_icon.png')}
             />
            </TouchableOpacity>


          </View>
          <View style={styles.newsContainer}>
            <News/>
          </View>
        </View>
      );
  }
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    navigationContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    headerImage:{

    },
    submitContainer:{
      margin:10,
      flex:1,
      alignSelf: 'stretch',
      paddingTop:20,
      paddingBottom:20,
      backgroundColor:'#F9CF00',

      borderRadius:10,
      borderWidth: 1,
      borderColor: '#F9CF00',

      alignItems:'center',
      justifyContent:'center',

      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 2,
    },

    SladderLogo:{
      width:70,
      height:70,
    },
    newsContainer:{
      flex:3.5,
      backgroundColor:"skyblue",
    },

  });
