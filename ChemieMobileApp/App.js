import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


//import Hello from './Hello';
import Login from './src/Login';
import LoginForm from './src/loginForm';
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Login />
        <LoginForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
