import * as React from 'react';
import { Text, View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import { Provider as StoreProvider } from 'react-redux';
import Navbar from './components/config/navigation';
import firebase from './components/config/firebase';
// import { connect } from 'react-redux';
// or any pure javascript modules available in npm
import { Button, Card, Provider as PaperProvider } from 'react-native-paper';
import { store } from './components/store';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      asyncDataUser: '', //<-----How to pass this name to CustomDrawerContentComponent????
    };
  }

  componentDidMount() {
    this.authListener();
    console.log(this.props);
    this.getUserFromAsynStorage();
  }

  getUserFromAsynStorage = () => {
    AsyncStorage.getItem('userData').then(user_data_json => {
      let user_data = JSON.parse(user_data_json);
      // console.log('user_data', user_data.user);
      // console.log('user_data', user_data);
      if (user_data !== null) {
        this.setState({
          asyncDataUser: user_data.user.email,
        });
      } else {
        this.loginUser();
      }
    });
  };
  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('user changed..', user);
        this.setState({
          user: user.email,
        });
      } else {
        // No user is signed in.
        // browserHistory.push('/signin');
      }
    });
  }

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      // var user = firebase.auth().currentUser;

      // user
      //   .delete()
      .then(function(res) {
        // User deleted.
        console.log('Response', res);
        this.props.remove_user(res);
      })
      .catch(function(error) {
        // An error happened.
        console.log('error', error);
      });

    Alert.alert('LOGOUT successfully');
  };
  render() {
    const { asyncDataUser } = this.state;
    return (
      <StoreProvider store={store}>
        <PaperProvider>
          <Navbar screenProps={{ user: asyncDataUser }} />
        </PaperProvider>
      </StoreProvider>
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
