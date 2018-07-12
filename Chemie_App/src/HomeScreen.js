import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';



export default class HomeScreen extends React.Component{
  static navigationOptions = {
    title: 'Home',
    header: null,
  };
  render(){
    return (

        <View style={styles.homeContainer}>
          <TouchableOpacity style={styles.navigationButtons}>
            <Text
              onPress={()=>this.props.navigation.navigate('Sladder')}
            >Sladreboks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationButtons}>
            <Text>Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationButtons}>
            <Text>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationButtons}>
            <Text>Events</Text>
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
      width:'30%',
      margin: 20,
    },
});
