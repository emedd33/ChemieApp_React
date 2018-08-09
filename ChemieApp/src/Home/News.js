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
  // fething articles from website.
  getNewsFromAPI = async() => {
    this.setState({loading:true});
    // http GET-request from httpRequests
    let httpResponse = await httpRequests.GetRequest(FETCH_NEWS_URL, this.state.AuthToken);

    //If token is not valid, sends user to loginScreen,
    if (httpResponse.httpStatus == 401){
      // TODO: Check this clearAsyncStorage
      clearAsyncStorage.clearAll();
    }
    if (httpResponse.httpStatus >= 200 && httpResponse.httpStatus < 300) {
      //an non-emty response is of length 1, while an empty response i of zero.
      if (httpResponse.response.length>= 1){
        //looping over all articlas and reformating strings for readability
        for (var i = 0; i<httpResponse.response.length && i < 5; i++){
          year = httpResponse.response[i].published_date.slice(0,4);
          month = httpResponse.response[i].published_date.slice(5,7);
          day = httpResponse.response[i].published_date.slice(8,10);
          let date_String = "Publisert " + day + "/" + month + "/" + year;
          httpResponse.response[i].published_date = date_String;
        }

      }
      //Empty response from HttpRequest
      else {
        httpResponse.response= "empty"
      }

      this.setState({
        articles:httpResponse.response,
        connected:true,
      });
    }
    this.setState({
      loading:false,
    });
  }
  componentWillMount(){
    this.getNewsFromAPI()
  }


render(){
  //while functions are running
  if(this.state.loading){
    return(
      <View style={styles.loadingContainer}>
        <Progress.Circle size={80} indeterminate={true} color="black" />
      </View>
    );
  }
  //The httprequest failed, with no 200 status
  if(!this.state.connected){
    return(
      <View style={styles.loadingContainer}>
        <Text>Ingen nettforbindelse</Text>
      </View>
    );
  }
  //The HttpRequest feched no news articlas
  if(this.state.articles == "empty"){
    return(
      <View style={styles.loadingContainer}>
        <Text>Ingen nyheter å hente</Text>
      </View>
    );
  }
  return(
    <ScrollView style={styles.container}>
      <View style={styles.newsContainer}>
        { //Looping over all articles in state and deploying them as HTML, with image and title
          this.state.articles.map(( item, key ) =>
            //Each article is now the iterative item.
            (
              <View key = { key } style = { styles.item }>
                <Text style = { styles.titleText }>{ item.title }</Text>
                <Text style = { styles.dateText }>{ item.published_date}</Text>
                <Image
                  resizeMode='contain'
                  style={styles.newsImage}
                  source={{uri:item.image}} />
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
