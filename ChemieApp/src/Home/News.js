import React from 'react';
import * as Progress from 'react-native-progress';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  Dimensions,
  Image
} from 'react-native';

import HTML from 'react-native-render-html';

import httpRequests from 'ChemieApp/src/Functions/HttpRequests'
import clearAsyncStorage from 'ChemieApp/src/Functions/clearAsyncStorage'
import base_params from 'ChemieApp/Params.js';
const FETCH_NEWS_URL = base_params.base_url.concat('/api/news/articles/');


export default class News extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      articles: "empty",
      loading:true,
      connected:false,
      AuthToken:this.props.navigation.state.params.authToken,
      httpStatus:null,
      }
    this.getNewsFromAPI = this.getNewsFromAPI.bind(this);
  }

  getNewsFromAPI = async() => {
    this.setState({loading:true});
    let httpResponse = await httpRequests.GetRequest(FETCH_NEWS_URL, this.state.AuthToken);

    //If token is not valid, sends user to loginScreen,
    if (httpResponse.httpStatus == 401){
      clearAsyncStorage.clearAll();
    }
    if (httpResponse.httpStatus >= 200 && httpResponse.httpStatus < 300) {
      if (httpResponse.response.length>= 1){
        for (var i = 0; i<httpResponse.response.length && i < 5; i++){
          year = httpResponse.response[i].published_date.slice(0,4);
          month = httpResponse.response[i].published_date.slice(5,7);
          day = httpResponse.response[i].published_date.slice(8,10);
          let date_String = "Publisert " + day + "/" + month + "/" + year;
          httpResponse.response[i].published_date = date_String;
        }

      } else {
        httpResponse.response= "empty"
      }
      this.setState({
        articles:httpResponse.response,
        connected:true,
      });
        //Converting published_date to more readable format for user
      }
    this.setState({
      loading:false,
    });
  }
  componentWillMount(){
    this.getNewsFromAPI()
  }


render(){

  if(this.state.loading){
    // TODO: This needs to be chacked to IOS, https://github.com/oblador/react-native-progress
    return(
      <View style={styles.loadingContainer}>
        <Progress.Circle size={80} indeterminate={true} color="black" />
      </View>
    );
  }
  if(!this.state.connected){
    return(
      <View style={styles.loadingContainer}>
        <Text>Ingen nettforbindelse</Text>
      </View>
    );
  }
  if(this.state.articles == "empty"){
    return(
      <View style={styles.loadingContainer}>
        <Text>Ingen nyheter å hente</Text>
      </View>
    );
  }
  console.log(this.state.articles);
  return(
    <ScrollView style={styles.container}>
      <View style={styles.newsContainer}>
        {
          this.state.articles.map(( item, key ) =>
            (
              <View key = { key } style = { styles.item }>
                <Text style = { styles.titleText }>{ item.title }</Text>
                <Text style = { styles.dateText }>{ item.published_date}</Text>
                <Image
                  resizeMode='contain'
                  style={styles.newsImage}
                  source={{uri:"http://192.168.1.34:8000/media/news/IMG_20180401_160545521_XHMic9V.jpg"}} />
                <HTML style={styles.contentText} html={item.content} imagesMaxWidth={Dimensions.get('window').width} />
                <View style = { styles.newsSeparator }/>
              </View>
            ))
        }
      </View>

    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:3,
  },
  loadingContainer:{
    marginTop:50,
    justifyContent:'center',
    alignItems:'center',
  },
  newsContainer:{
    justifyContent:'center',
    alignItems:'center',
    margin:20,
  },
  titleText:{
    textAlign:'center',
    fontSize:40,

  },
  dateText:{
    textAlign:'center',
  },
  contentText:{

  },
  newsImage:{
    width:200,
    height:200,
    alignSelf:'center',

  },
  newsSeparator:{
    height:20,
  }


});
