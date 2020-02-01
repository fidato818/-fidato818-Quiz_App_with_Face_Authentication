import React, { Component } from 'react';
import CountDown from 'react-native-countdown-component';
import {
  Constants,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {
  RadioButton,
  Button,
  Appbar,
  Provider as PaperProvider,
  Card,
  Title,
  Paragraph,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';

export default class Result extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      answerCorrect: this.props.navigation.state.params.answer,
    };
  }

  componentDidMount() {
    console.log('this.props', this.props.navigation.state.params.answer);
  }
  render() {
    const { answerCorrect } = this.state;
    return (
      <View
        style={{ 
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#78909C',
        }}>
        <Card style={styles.endquizContainer} elevation={2}>
          <Card.Content>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              End of the Quiz!
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20, 
                marginBottom: 30,
              }}>
              Your Score is: {answerCorrect}
            </Text>
            {answerCorrect >= 80 && answerCorrect <= 100 ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  marginBottom: 30,
                }}>
                Your Reward Title is:
                <Text style={{ color: 'green' }}> 'You Are Awesome'</Text>
              </Text>
            ) : answerCorrect >= 50 && answerCorrect <= 80 ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  marginBottom: 30,
                }}>
                Your Reward Title is:
                <Text style={{ color: 'green' }}> 'Very Good'</Text>
              </Text>
            ) : answerCorrect >= 20 && answerCorrect <= 50 ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  marginBottom: 30,
                  color: 'red',
                }}>
                You Are Failed!
              </Text>
            ) : (
              answerCorrect == 0 && (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    marginBottom: 30,
                    color: 'red',
                  }}>
                  You Are Failed!
                </Text>
              )
            )}
            <Button
              mode="contained"
              color="#3498db"
              onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Text style={{ color: 'white' }}>Test Again</Text>
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   // flex: 1,
  //   // justifyContent: 'center',
  //   // paddingTop: Constants.statusBarHeight,
  //   backgroundColor: '#78909C',
  //   padding: 8,
  // },
  endquizContainer: {
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    padding: 8,
    margin: 10,
  },
  // noaccess: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // paddingTop: Constants.statusBarHeight,
  //   backgroundColor: '#ecf0f1',
  // },
  // loading: {
  //   position: 'absolute',
  //   backgroundColor: '#78909C',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
