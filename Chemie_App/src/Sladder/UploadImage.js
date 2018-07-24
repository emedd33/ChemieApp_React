import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import * as Progress from 'react-native-progress';
import {
  ImagePicker,
} from 'expo';

export default class UploadImage extends React.Component{
  constructor(props){
    super(props);
    this.selectImageFromDevice = this.selectImageFromDevice.bind(this);
    this.state = {
      imageSelected:null,
      imageName: '',
      loading:false,
    }
  }
  updateParentState(data) {
      this.props.updateParentState(data);
  }
  selectImageFromDevice = async() => {
    this.setState({
      loading:true,
    })
    console.log("Sladder selectImageFromDevice");
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (!result.cancelled) {
    this.setState({
      imageSelected:true,
      imageName:"image name",
      loading:false,
    })

    this.updateParentState({image: result})
    }
  }
render(){
  if (this.state.loading){
    return(
      <View style={styles.container}>
        <Progress.Circle size={80} indeterminate={true} color="black" />
      </View>
    );
  }
  if (this.state.imageSelected){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.uploadImageContainer}
          onPress={this.selectImageFromDevice}
        >
          <Text>
            Klart for opplasting
          </Text>
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
  }

});
