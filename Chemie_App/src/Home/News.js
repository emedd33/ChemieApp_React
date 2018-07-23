import React from 'react';
import * as Progress from 'react-native-progress';


import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native';

const fetch_url = "http://192.168.1.101:8000/api/news/articles/";

export default class News extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading:true,
      AuthToken:'',
      httpStatus:null,
      }

    this.articles = ['Test', 'Test 2'];
    this.getNewsFromAPI = this.getNewsFromAPI.bind(this);
  }

  getNewsFromAPI = async() => {
    let token = await AsyncStorage.getItem('AuthToken');
    this.setState({
      AuthToken:token,
    });
    let jsonResponse = await fetch(fetch_url,{
      method:'GET',
      headers:{
        "Authorization": this.state.AuthToken,
      },
    })
      .then((response) => {
        this.setState({
          httpStatus:response.status,
        })
        console.log("ok2");
        return response.text();
      })
      .then((responseJson)  => {
        let res = JSON.parse(responseJson);
        return res;
      })
      .catch((error) => {
         console.error(error);
      });
      console.log("POST FETCH");
      console.log(this.state.httpStatus);
      console.log(jsonResponse);
      if (this.state.httpStatus >= 200 && this.state.httpStatus < 300) {
        this.setState({
          articles:jsonResponse,
        });
      }
      this.setState({
        loading:false,
      })
  }
  componentWillMount(){
    console.log("News componentWillMount");
    this.getNewsFromAPI()
  }
  componentDidMount(){

  }

render(){
  while(this.state.loading){
    // TODO: This needs to be chacked to IOS, https://github.com/oblador/react-native-progress
    return(
      <View style={styles.loadingContainer}>
        <Progress.Circle size={80} indeterminate={true} color="black" />
      </View>
    );
  }
  return(
    <ScrollView style={styles.container}>

      {
        this.state.articles.map(( item, key ) =>
          (
            <View key = { key } style = { styles.item }>
              <Text style = { styles.text }>{ item.title }</Text>
              <Text style = { styles.text }>{ item.content }</Text>

              <View style = { styles.separator }/>
            </View>
          ))
      }
    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:3,
  },
  loadingContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
  }

});
