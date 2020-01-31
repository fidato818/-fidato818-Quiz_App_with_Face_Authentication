import * as React from 'react';
import { Text, View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import Navbar from './components/config/navigation';
import { Button, Card, Provider as PaperProvider } from 'react-native-paper';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PaperProvider>
        <Navbar />
      </PaperProvider>
    );
  } 
} 

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: Constants.statusBarHeight,
  //   backgroundColor: '#ecf0f1',
  //   padding: 8,
  // },
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
});
