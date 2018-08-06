import React, { Component, AsyncStorage } from 'react';

class ClearAsyncStorage extends Component{
  clearAll =()=>{
    console.log("Clear all");
  }
}

const clearAsyncStorage = new ClearAsyncStorage();
export default clearAsyncStorage;
