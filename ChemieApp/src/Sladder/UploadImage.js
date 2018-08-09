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

//Alert box, which is shown when user is prompt to pick image
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
      imagePath:null,
    }
  }
  //Updating Sladderform with image data when image is selected
  updateParentState(data) {
      this.props.updateParentState(data);
  }
  selectImageFromDevice = async() => {
    // TODO: Change text of alert text to norwegian.
    ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {

    }
    else if (response.error) {

    }
    else //Image is picked from either camera or gallery
    {
      //getting image data as base64 format
      let imageData = { uri: 'data:image/jpeg;base64,' + response.data };

      //updaging eventForm with image data
      this.updateParentState({image:imageData})
      this.setState({
        imageData:imageData,
        imageSelected:true,
      });
      }
      this.setState({
        loading:false,
      });
    });
  }

  deleteImage(){
    this.setState({
      loading:true,
    });

    //clears all image data from parents state.
    this.updateParentState({image:null});
    this.setState({
      imageSelected:false,
      imageData:null,
      loading:false,
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
            Klart
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
        </TouchableOpacity><Image source={this.state.avatarSource} style={styles.uploadAvatar} />
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
    backgroundColor:'ghostwhite',
    marginBottom:10,
    marginLeft:40,
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
    backgroundColor:'red',
    marginLeft:40,
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
