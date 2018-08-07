import React from 'react';
import * as Progress from 'react-native-progress';
var ImagePicker = require('react-native-image-picker');

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

var options = {
  title: 'Velg bilde',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class UploadImage extends React.Component{
  constructor(props){
    super(props);
    this.selectImageFromDevice = this.selectImageFromDevice.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.state = {
      imageSelected:null,
      loading:false,
      imageSource:null,
    }
  }
  updateParentState(data) {
      this.props.updateParentState(data);
  }
  selectImageFromDevice = async() => {
    // TODO: Change text of alert text to norwegian.
    ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else {
      this.setState({loading:true})
      let source = { uri: response.uri };
      console.log(source.uri);
      this.setState({
        imageSource: source.uri,
        imageSelected:true,
        loading:false,
      });
      this.updateParentState({image:source.uri})
      }
    });
  }

  deleteImage(){
    this.setState({
      loading:true,
    });

    this.updateParentState({image:null});
    this.setState({
      loading:false,
      imageSelected:false,
      imageSource:null,
    });
  }
render(){
  if (this.state.loading){
    return(
      <View style={styles.loadingContainer}>
        <Progress.Circle size={80} indeterminate={true} color="black" />
      </View>
    );
  }
  if (this.state.imageSelected){
    return(
      <View style={styles.deleteContainer}>
        <TouchableOpacity
          style={styles.uploadImageContainer}
          onPress={this.selectImageFromDevice}
        >
          <Text>
            Klart for opplasting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteImageConatiner}
          onPress={this.deleteImage}
        >
          <Image
            source={require('./images/Delete_icon.png')}
            style={styles.Picture_icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return(
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.uploadImageContainer}
        onPress={this.selectImageFromDevice}
      >
        <Image
          source={require('./images/Picture_icon.png')}
          style={styles.Picture_icon}
        />
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  uploadImageContainer:{
    alignSelf: 'stretch',
    height:50,
    flex:1,
    marginBottom:10,
    marginLeft:50,
    marginRight:50,
    borderRadius:10,

    borderWidth: 1,
    borderColor:'#000',
    alignItems:'center',
    justifyContent: 'center',
    shadowColor: '#1d1d1d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  Picture_icon:{
    width:50,
    height:50,
    alignSelf:'center',
    margin:20,
    marginTop:25,
  },
  deleteImageConatiner:{
    flex:1,
    alignSelf: 'stretch',
    height:50,
    marginLeft:50,
    marginRight:50,
    borderRadius:10,
    borderWidth: 1,
    borderColor:'#000',
    alignItems:'center',
    justifyContent: 'center',
    shadowColor: '#1d1d1d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  deleteContainer:{
    flex:1,
    flexDirection:'row',
    margin:10,
  },
  loadingContainer:{
    flex:1,
  }

});
