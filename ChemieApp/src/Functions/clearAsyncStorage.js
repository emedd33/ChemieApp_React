import React, { Component, AsyncStorage } from 'react';

class ClearAsyncStorage extends Component{
  clearAll = ()=>{
    console.log("clear all userdata");

    //AsyncStorage.removeItem('isAuthenticated'); 
    /*await AsyncStorage.removeItem('AuthToken');
    await AsyncStorage.removeItem('Firstname');
    await AsyncStorage.removeItem('Lastname');
    await AsyncStorage.removeItem('access_card');
    await AsyncStorage.removeItem('grade');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('id');*/
  }
}

const clearAsyncStorage = new ClearAsyncStorage();
export default clearAsyncStorage;
