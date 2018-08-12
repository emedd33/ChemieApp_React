
import React, { Component } from 'react';
import base_params from 'ChemieApp/Params.js';
import { StyleSheet, View, Alert, Platform, Button, AsyncStorage } from 'react-native';

const FETCH_LOGIN_URL = base_params.base_url.concat('/api/api-auth/');
class HttpRequests extends Component {
  constructor(props){
    super(props);
    this.state={
      response:null,
      error:null,
      httpStatus:null,
    }
  }
  GetRequest=async(fetch_url, AuthToken)=>{
    let jsonResponse = await fetch(fetch_url,{
      method:'GET',
      headers:{
        "Authorization": AuthToken,
      },
      timeout: 5000,
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
  PostLoginRequest=async(username, password)=>{
      await fetch(FETCH_LOGIN_URL,{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      body: JSON.stringify({
        username:username,
        password:password,
      }),
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
      console.log(error);
       let err = error;
       this.state.error = err
    });
    return this.state;
  }
  PostRequest=async(fetch_url, body, authToken)=>{
    console.log(authToken);
    await fetch(fetch_url,{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type': 'application/json',
      "Authorization": authToken,
    },
    timeout: 5000,
    body: JSON.stringify(body),
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
    console.log(error);
     let err = error;
     this.state.error = err
  });
  console.log(this.state);
  return this.state;
  }
}
const httpRequests = new HttpRequests()
export default httpRequests
