import * as React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import * as Facebook from 'expo-facebook';
import { update_user, remove_user } from '../../store/actions/index';
import firebase from '../../config/firebase';

import {
  Card,
  Button,
  FAB,
  Portal,
  Modal,
  Text,
  Provider,
  Surface,
  HelperText,
  Paragraph,
  Dialog,
  TextInput,
  Avatar,
  Title,
} from 'react-native-paper';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import Textarea from 'react-native-textarea';
import { AppAuth } from 'expo-app-auth';

// This value should contain your REVERSE_CLIENT_ID
// const { URLSchemes } = AppAuth;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      name: '',
      email: '',
      password: '',
      open: false,
      visibleDialog: false,
      toggle: false,
      asyncDataUser: '',
      progress: new Animated.Value(0),
    };

    this.authListener = this.authListener.bind(this);
  }
  _showDialog = () => this.setState({ visibleDialog: true });
  _hideDialog = () => this.setState({ visibleDialog: false });

  componentDidMount() {
    this.authListener();
    this.getUserFromAsynStorage();
    this.prog();
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

  prog = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  };
  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('user changed..', user);
        this.setState({
          displayName: user.email,
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
        this.props.remove_user(res);
        // console.log('Response', res);
      })
      .catch(function(error) {
        // An error happened.
        console.log('error', error);
      });

    Alert.alert('LOGOUT successfully');
  };

  signUpUser = () => {
    const { name, age, email, password, visibleDialog } = this.state;
    if (email == '' || password == '') {
      // Alert.alert('Please fill all field');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(e => {
          console.log('Document written with ID: ', e);
          this.props.store_user(e);
          this._hideDialog();
          this.props.navigation.navigate('Dashboard');
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
          // Alert.alert('Error: ', error);
        });
    }

    // Alert.alert('Please fill all field');
  };
  loginUser = () => {
    const { name, age, email, password, visibleDialog } = this.state;
    if (email == '' || password == '') {
      // Alert.alert('Please fill all field');
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

        .then(userData => {
          // this.setState({
          //   visibleDialog: false,
          // });
          console.log('Document written with ID: ', userData);
          AsyncStorage.setItem('userData', JSON.stringify(userData));
          this.props.store_user(userData);
          this._hideDialog();
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
          // Alert.alert('Error: ', error);
        });
    }

    // Alert.alert('Please fill all field');
  };

  render() {
    const {
      displayName,
      asyncDataUser,
      email,
      password,
      visibleDialog,
      name,
      toggle,
    } = this.state;
    const { user } = this.props;
    // console.log('this.props.user', user);

    return (
      <View style={styles.container}>
        <Card style={{ justifyContent: 'flex-start' }}>
          <Card.Content>
            <Title>Quiz Trivia</Title>
            <Paragraph>
              Test your knowledge of the material on this website with these
              quizzes. Take all the time you need, concentrate on each question.
              If you don't do well, it's ok. Just go back, review the material
              and you'll do better next time.
            </Paragraph>
          </Card.Content>

          <Card.Actions style={{ justifyContent: 'flex-end' }}>
            <Button
              mode="contained"
              color="#3498db"
              onPress={() => this.props.navigation.navigate('Scan Face')}>
              Start Quiz
            </Button>
          </Card.Actions>
        </Card>
      </View> 
    );
  }
  // <LottieView
  //   source={require('../../animateFiles/5758-react-native-firebase.json')}
  //   progress={this.state.progress}
  // />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  // paragraph: {
  //   margin: 12,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
});
