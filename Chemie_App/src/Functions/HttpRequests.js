
import React, { Component } from 'react';

import { StyleSheet, View, Alert, Platform, Button, AsyncStorage } from 'react-native';
class HttpRequests extends Component {
  constructor(props){
    super(props);
    this.state={
      response:null,
      AuthToken:null,
      error:null,
      httpStatus:null,
    }
  }
  GetRequest=async(fetch_url)=>{
    let token = await AsyncStorage.getItem('AuthToken');
    let jsonResponse = await fetch(fetch_url,{
      method:'GET',
      headers:{
        "Authorization": token,
      },
    })
      .then((response) => {
        let httpStatus = response.status;
        this.state.httpStatus = httpStatus;
        return response.text();
      })
      .then((responseJson)  => {
        let res = JSON.parse(responseJson);
        this.state.response = res;

      })
      .catch((error) => {
         let err = error;
         this.state.error = err
      });
      return this.state;
  }
}
const HttpRequest = new HttpRequests()
export default HttpRequest
