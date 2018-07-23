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
    console.log("News getNewsFromAPI");
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
      if (this.state.httpStatus >= 200 && this.state.httpStatus < 300) {
        for (var i = 0; i<jsonResponse.length && i < 5; i++){
          year = jsonResponse[i].published_date.slice(0,4);
          month = jsonResponse[i].published_date.slice(5,7);
          day = jsonResponse[i].published_date.slice(8,10);
          let date_String = "Publisert " + day + "/" + month + "/" + year;
          jsonResponse[i].published_date = date_String;
        }
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
    width:150,
    height:150,
    alignSelf:'center',

  },
  newsSeparator:{
    height:20,
  }


});
