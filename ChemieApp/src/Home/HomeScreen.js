import React from 'react';
import {View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  AsyncStorage,
  YellowBox,
} from 'react-native';

//A bug from React-native side prompts this warning.
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import News from './News';

export default class HomeScreen extends React.Component{
  static navigationOptions = {
    title: 'Home',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
    //Adding HC_icon to title bar
    headerTitle: (
      <Image
        source={require('./images/hclogo_headerIcon.png')}
        style={{width:50, height:50, marginLeft:10,        }}
      />
  ),
  };
  constructor(props){
    super(props);
    this.navigateToScreen = this.navigateToScreen.bind(this);
    this.state = {
      profile:props.navigation.state.params.profile,
      authToken:props.navigation.state.params.authToken,
    }

  }

  //Adding listener to hardware backpress arrow on android devices
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    console.log(this.state);
  }

   //removing backpress listener
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

   //returning true prevents device to go back to splash screen
  handleBackButton() {
    return true;
  }
  navigateToScreen(screen){
    this.props.navigation.navigate(screen, {profile:this.state.profile,authToken:this.state.authToken})
  }


  render(){
    return (
        <View style={styles.container}>
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              //button for navigation to sladder
              style={styles.submitContainer}
              onPress={()=>this.navigateToScreen("Sladder")}
            >
              <Image
                resizeMode='contain'
                style={styles.SladderLogo}
                source={require('./images/Gossip_icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              //button for navigation to Notification
              style={styles.submitContainer}
              onPress={()=>this.navigateToScreen("Notification")}
            >
              <Image
                resizeMode='contain'
                style={styles.SladderLogo}
                source={require('./images/Coffee_icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              //button for navigation to Events
              style={styles.submitContainer}
              onPress={()=>this.navigateToScreen("Events")}
            >
              <Image
                resizeMode='contain'
                style={styles.SladderLogo}
                source={require('./images/Party_icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              //button for navigation to Settings
              style={styles.submitContainer}
              onPress={()=>this.navigateToScreen("Settings")}
            ><Image
              resizeMode='contain'
              style={styles.SladderLogo}
              source={require('./images/Settings_icon.png')}
             />
            </TouchableOpacity>


          </View>
          <View style={styles.newsContainer}>
            <News navigation={this.props.navigation}/>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 2,

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
      flex:4,
    },

  });
