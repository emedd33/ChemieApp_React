import React, { Component } from 'react';

class clearAsyncStorrage extends Component{

}
const clearAsyncStorrage = new clearAsyncStorrage();
  getMonthFunction=async()=>{
    await AsyncStorage.removeItem('AuthToken');
    await AsyncStorage.removeItem('Firstname');
    await AsyncStorage.removeItem('Lastname');
    await AsyncStorage.removeItem('access_card');
    await AsyncStorage.removeItem('grade');
    await AsyncStorage.removeItem('membership');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('id');
  }
export default clearAsyncStorrage;
