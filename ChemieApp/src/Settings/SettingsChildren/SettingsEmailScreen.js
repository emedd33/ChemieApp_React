import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
} from 'react-native';

export default class SettingsEmailScreen extends React.Component{
  static navigationOptions = {
    title: 'E-poster til komiteer',
    headerStyle: {
      backgroundColor: '#F9CF00'
    },
    };
  constructor(props){
    super(props);
    this.openMail = this.openMail.bind(this);
  }
  openMail(mail){
    let mailto = "mailto:"
    if (mail=="pyrogruppa"){
      mail= mail.concat("@gmail.com?")
    } else {
      mail= mail.concat("@hc.ntnu.no?");
    }
    mailto = mailto.concat(mail);
    Linking.openURL(mailto);
  }
render(){
  //emails for styret
  /*
    let lederText = <Text style={{marginLeft:10}} >pHormand: </Text>
    let lederEmail = <Text style={styles.emailText} onPress={()=>this.openMail("phormand")}>phormand@hc.ntnu.no</Text>

    let prsjefText = <Text style={{marginLeft:10}} >PR-sjepH: </Text>
    let prsjefEmail = <Text style={styles.emailText} onPress={()=>this.openMail("pr-sjef")}>pr-sjef@hc.ntnu.no</Text>

    let secretausText = <Text style={{marginLeft:10}} >PR-sjepH: </Text>
    let secretausEmail = <Text style={styles.emailText} onPress={()=>this.openMail("something")}>pr-something@hc.ntnu.no</Text>

    let kassererText = <Text style={{marginLeft:10}} >Kasserer: </Text>
    let kassererEmail = <Text style={styles.emailText} onPress={()=>this.openMail("Kasserer")}>kasserer@hc.ntnu.no</Text>

    let festsjefText = <Text style={{marginLeft:10}} >pHaestsjepH: </Text>
    let festsjefEmail = <Text style={styles.emailText} onPress={()=>this.openMail("something")}>something@hc.ntnu.no</Text>

    let indkomsjefText = <Text style={{marginLeft:10}} >Indkomsjef: </Text>
    let indkomsjefEmail = <Text style={styles.emailText} onPress={()=>this.openMail("something")}>something@hc.ntnu.no</Text>

    let kjellersjefText = <Text style={{marginLeft:10}} >KjellersjepH: </Text>
    let kjellersjefEmail = <Text style={styles.emailText} onPress={()=>this.openMail("something")}>something@hc.ntnu.no</Text>

    let websjefText = <Text style={{marginLeft:10}} >websjepH: </Text>
    let websjefEmail = <Text style={styles.emailText} onPress={()=>this.openMail("something")}>something@hc.ntnu.no</Text>
  */

//Emails for all subgroups
  let arkivarerText = <Text style={{marginLeft:10}} >Arkivarene: </Text>
  let arkivarerEmail = <Text style={styles.emailText} onPress={()=>this.openMail("arkivarene")}>arkivarene@hc.ntnu.no</Text>

  let arrkomText = <Text style={{marginLeft:10}}>Arrangementkomiteen: </Text>
  let arrkomEmail = <Text style={styles.emailText} onPress={()=>this.openMail("arrkom")}>arrkom@hc.ntnu.no</Text>

  let acText = <Text style={{marginLeft:10}}>Audiochromatene: </Text>
  let acEmail = <Text style={styles.emailText} onPress={()=>this.openMail("arrkom")}>ac@hc.ntnu.no</Text>

  let fadderkomText = <Text style={{marginLeft:10}}>Fadderkomiteen: </Text>
  let fadderkomEmail = <Text style={styles.emailText} onPress={()=>this.openMail("fadderkom")}>fadderkom@hc.ntnu.no</Text>

  let indkomText = <Text style={{marginLeft:10}}>Industrikomiteen: </Text>
  let indkomEmail = <Text style={styles.emailText} onPress={()=>this.openMail("indkom")}>indkom@hc.ntnu.no</Text>

  let kjellerText = <Text style={{marginLeft:10}}>Kjellerstyret: </Text>
  let kjellerEmail = <Text style={styles.emailText} onPress={()=>this.openMail("kjerllerstyret")}>kjellerstyret@hc.ntnu.no</Text>

  let konkomText = <Text style={{marginLeft:10}}>Kontrollkomiteen: </Text>
  let konkomEmail = <Text style={styles.emailText} onPress={()=>this.openMail("konkom")}>konkom@hc.ntnu.no</Text>

  let festkomText = <Text style={{marginLeft:10}}>pHaestkomiteen: </Text>
  let festkomEmail = <Text style={styles.emailText} onPress={()=>this.openMail("festkom")}>festkom@hc.ntnu.no</Text>

  let promokomText = <Text style={{marginLeft:10}}>Promoteringskomiteen: </Text>
  let promokomEmail = <Text style={styles.emailText} onPress={()=>this.openMail("promokom")}>promokom@hc.ntnu.no</Text>

  let pyroText = <Text style={{marginLeft:10}}>Pyrogruppen: </Text>
  let pyroEmail = <Text style={styles.emailText} onPress={()=>this.openMail("pyrogruppa")}>pyrogruppa@gmail.com</Text>

  let sportskomText = <Text style={{marginLeft:10}}>Sportskomiteen: </Text>
  let sportskomEmail = <Text style={styles.emailText} onPress={()=>this.openMail("sportskom")}>sportskom@hc.ntnu.no</Text>

  let styretText = <Text style={{marginLeft:10}}>Styret: </Text>
  let styretEmail = <Text style={styles.emailText} onPress={()=>this.openMail("styret")}>styret@hc.ntnu.no</Text>

  let sugepumpaText = <Text style={{marginLeft:10}}>Sugepumpa: </Text>
  let sugepumpaEmail = <Text style={styles.emailText} onPress={()=>this.openMail("sp")}>sp@hc.ntnu.no</Text>

  let ttText = <Text style={{marginLeft:10}}>TapHel & Todyy: </Text>
  let ttEmail = <Text style={styles.emailText} onPress={()=>this.openMail("tt")}>tt@hc.ntnu.no</Text>

  let utenriksText = <Text style={{marginLeft:10}}>Utenrikskomiteen: </Text>
  let utenriksEmail = <Text style={styles.emailText} onPress={()=>this.openMail("utenriks")}>utenriks@hc.ntnu.no</Text>

  let webkomText = <Text style={{marginLeft:10}}>Webkomiteen: </Text>
  let webkomEmail = <Text style={styles.emailText} onPress={()=>this.openMail("webkom")}>webkom@hc.ntnu.no</Text>

  let wettreText = <Text style={{marginLeft:10}}>Wettrekomitten: </Text>
  let wettreEmail = <Text style={styles.emailText} onPress={()=>this.openMail("wertre")}>wetrre@hc.ntnu.no</Text>



return(
    <ScrollView style={styles.container}>
      <View style={styles.emailContainerWhite}>
        {arkivarerText}
        {arkivarerEmail}
      </View>
      <View style={styles.emailContainerGray}>
        {arrkomText}
        {arrkomEmail}
      </View>
      <View style={styles.emailContainerWhite}>
        {acText}
        {acEmail}
      </View>
      <View style={styles.emailContainerGray}>
        {fadderkomText}
        {fadderkomEmail}
      </View>
      <View style={styles.emailContainerWhite}>
        {indkomText}
        {indkomEmail}
      </View>

      <View style={styles.emailContainerGray}>
        {kjellerText}
        {kjellerEmail}
      </View>
      <View style={styles.emailContainerWhite}>
        {konkomText}
        {konkomEmail}
      </View>
      <View style={styles.emailContainerGray}>
        {festkomText}
        {festkomEmail}
      </View>
      <View style={styles.emailContainerWhite}>
        {promokomText}
        {promokomEmail}
      </View>

      <View style={styles.emailContainerGray}>
        {pyroText}
        {pyroEmail}
      </View>
      <View style={styles.emailContainerWhite}>
        {sportskomText}
        {sportskomEmail}
      </View>
      <View style={styles.emailContainerGray}>
        {styretText}
        {styretEmail}
      </View>
      <View style={styles.emailContainerWhite}>
        {sugepumpaText}
        {sugepumpaEmail}
      </View>

      <View style={styles.emailContainerGray}>
        {ttText}
        {ttEmail}
      </View>
      <View style={styles.emailContainerWhite}>
        {utenriksText}
        {utenriksEmail}
      </View>

      <View style={styles.emailContainerGray}>
        {webkomText}
        {webkomEmail}
      </View>
      <View style={styles.emailContainerWhite}>
        {wettreText}
        {wettreEmail}
      </View>

    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  emailContainerGray:{
    flexDirection:'row',
    height:50,
    alignItems:'center',
  },
  emailContainerWhite:{
    flexDirection:'row',
    height:50,
    alignItems:'center',
    backgroundColor:'ghostwhite',
  },
  emailText:{
    color:'blue',
    position:'absolute',
    right:10,
  }

});
