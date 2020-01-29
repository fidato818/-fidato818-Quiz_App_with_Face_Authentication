import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  TextInput,
  Button,
  FAB,
  Portal,
  Provider,
  SafeAreaView,
  ScrollView,
  Constants,
  Snackbar,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { update_user, remove_user } from '../../store/actions';
import axios from 'axios';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      open: false,
      email: '',
      password: '',
      visibleSnackbar: false,
    };
  }

  loginUser = event => {
    // // event.preventDefault();
    const { email, password, visibleSnackbar } = this.state;
    // const userLogin = {
    //   email: email,
    //   password: password,
    // };
    // // console.log(userLogin);
    // // axios.post('http://localhost:3000/signup/add', userAdd)
    // axios
    //   .post('https://newreactnativeapp.herokuapp.com/users/login', userLogin)
    //   .then(res => {
    //     console.log('res', res.data);
    //     const userDataLogin = res.data;
    //     this.props.store_user(userDataLogin);
    //     this.props.navigation.navigate('Home', {
    //       user: JSON.stringify(userDataLogin),
    //     });
    //   })
    //   .catch(err => {
    //     console.log('error: ', err);
    //   });
    //  Alert.alert('succes')
    this.props.navigation.navigate('Dashboard');
    // this.setState({ visibleSnackbar: true });
  };

  render() {
    const { text, email, password, visibleSnackbar } = this.state;
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
    return (
      <ImageBackground
        source={require('../../../assets/images/kobu-agency-ipARHaxETRk-unsplash.jpg')}
        style={styles.backgroundImage}>
        <View style={{ backgroundColor: 'rgba(19,127,144, 0.7)', flex: 1 }}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior="position"
            keyboardVerticalOffset={keyboardVerticalOffset}
            enabled>
            <View>
              <Image
                style={{
                  // flex: 1,
                  width: '100%',
                  height: '53%',
                  resizeMode: 'center',
                  // alignItems: 'center',
                }}
                source={require('../../../assets/icons/kisspng-computer-icons-brain-number-quiz-vector-graphics-i-nootropics-club-smart-drugs-about-nootropics-club-5be61866954850.6096068315418061826115.png')}
              />
              <Text style={styles.text}>Welcome to Quiz App</Text>
              <Card style={styles.container}>
                <TextInput
                  label="email"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                />
                <Text />
                <TextInput
                  // keyboardType='numeric'
                  secureTextEntry
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
                <Text />
                <Button
                  style={{ backgroundColor: 'green' }}
                  // icon="camera"
                  // loading
                  mode="contained"
                  onPress={() => this.loginUser()}>
                  Log In
                </Button>
              </Card>
            </View>
          </KeyboardAvoidingView>
          <Snackbar
            visible={this.state.visibleSnackbar}
            onDismiss={() => this.setState({ visibleSnackbar: false })}
            duration={2000}
            action={{
              label: '',
              onPress: () => {
                // Do something
              },
            }}>
            SuccessFully Login
          </Snackbar>
        </View>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    store_user: user => dispatch(update_user(user)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  container: {
    // flex: 2,
    // marginTop: 30,
    // marginTop: Constants.statusBarHeight,
    backgroundColor: 'rgba(19,127,144, 0.7)',
    margin: 3,
  },
  // scrollView: {
  //   backgroundColor: 'pink',
  //   marginHorizontal: 20,
  // },
  text: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
