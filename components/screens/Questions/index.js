import React, { Component } from 'react';
import CountDown from 'react-native-countdown-component';
import { Constants, Text, View, StyleSheet, Image, Alert } from 'react-native';
import {
  RadioButton,
  Button,
  Appbar,
  Provider as PaperProvider,
  Card,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
const timer = () => {};
export default class Quest extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentQuesIndex: 0,
      questions: [],
      answers: [],
      answerCorrect: 0,
      value: '',
      timer: 60 * 5 + 30,
      photo: this.props.navigation.state.params.imageUri,
    };
  }

  async componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=10')
      .then(res => {
        return res.json();
      })
      .then(resp => {
        return this.setState({ questions: resp.results });
      });
     this.countdownTimer();
  }

  countdownTimer() {
    this.setState({ remainingTime: 60 * 5 + 30 });
    clearInterval(timer);
    var timer = setInterval(() => {
      if (!this.state.remainingTime) {
        clearInterval(timer);
        return false;
      }
      this.setState(prevState => {
        return { remainingTime: prevState.remainingTime - 1 };
      });
    }, 1000);
  }

  handleNext(e) {
    const {
      questions,
      correct,
      answerCorrect,
      currentQuesIndex,
      value,
    } = this.state;
    const { question, incorrect_answers, correct_answer } = questions[
      currentQuesIndex
    ];
    if (e === correct_answer) {
      let incrementCurrentQuestionIndex = this.state.currentQuesIndex + 1;
      let rightAnswer = this.state.answerCorrect + 10;
      this.setState({
        currentQuesIndex: incrementCurrentQuestionIndex,
        answerCorrect: rightAnswer,
        value: '',
        remainingTime: 10,
      });
    } else {
      let incrementCurrentQuestionIndex = this.state.currentQuesIndex + 1;
      this.setState({
        currentQuesIndex: incrementCurrentQuestionIndex,
        value: '',
        remainingTime: 10,
      });
    }
  }

  render() {
    const {
      questions,
      currentQuesIndex,
      answers,
      answerShow,
      correct,
      incorrect,
      value,
      resultValue,
      answerCorrect,
      rewardTitle,
      photo,
      remainingTime,
    } = this.state;
    console.log('remainingTime', remainingTime);

    // console.log(correct);
    // console.log(incorrect);

    if (!questions.length) {
      return <View />;
    }

    if (currentQuesIndex >= questions.length || remainingTime === 0) {
      return (
        <View style={styles.container}>
          <Card style={{ justifyContent: 'center' }}>
            <Card.Content>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>
                End of the Quiz!
              </Text>
              <Text
                style={{ textAlign: 'center', fontSize: 20, marginBottom: 30 }}>
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
                Test Again
              </Button>
            </Card.Content>
          </Card>
        </View>
      );
    }

    const { question, incorrect_answers, correct_answer } = questions[
      currentQuesIndex
    ];

    return (
      <PaperProvider>
        {photo ? (
          <View style={styles.container}>
            <Card style={{ justifyContent: 'flex-start' }}>
              <Card.Content>
                <CountDown
                  until={60 * 5 + 30}
                  size={30}
                  onFinish={() => this.notAnswerAnyquestion()}
                  digitStyle={{ backgroundColor: '#FFF' }}
                  digitTxtStyle={{ color: '#1CC625' }}
                  timeToShow={['M', 'S']}
                  timeLabels={{ m: 'MM', s: 'SS' }}
                />

                <Title>{question}</Title>
                <Divider />
                <RadioButton.Group
                  onValueChange={value => this.setState({ value })}
                  value={this.state.value}>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <RadioButton
                        color="#3498db"
                        value={incorrect_answers[0]}
                      />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text
                        onPress={() =>
                          this.setState({ value: incorrect_answers[0] })
                        }>
                        {incorrect_answers[0]}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <RadioButton
                        color="#3498db"
                        value={incorrect_answers[1]}
                      />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text
                        onPress={() =>
                          this.setState({ value: incorrect_answers[1] })
                        }>
                        >{incorrect_answers[1]}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <RadioButton
                        color="#3498db"
                        value={incorrect_answers[2]}
                      />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text
                        onPress={() =>
                          this.setState({ value: incorrect_answers[2] })
                        }>
                        {incorrect_answers[2]}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <RadioButton color="#3498db" value={correct_answer} />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text
                        onPress={() =>
                          this.setState({ value: correct_answer })
                        }>
                        {correct_answer}
                      </Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </Card.Content>

              <Card.Actions style={{ justifyContent: 'center' }}>
                {this.state.value ? (
                  <Button
                    disabled={false}
                    color="#3498db"
                    onPress={() => this.handleNext(value)}>
                    Next
                  </Button>
                ) : (
                  <Button
                    disabled
                    color="#3498db"
                    onPress={() => this.handleNext(value)}>
                    Next
                  </Button>
                )}
              </Card.Actions>
            </Card>
          </View>
        ) : (
          <View style={styles.noaccess}>
            <Text style={{ fontSize: 20, color: 'red' }}>
              You didn't access any Quiz!
            </Text>
            <Button
              mode="contained"
              disabled={false}
              color="#3498db"
              onPress={() => this.props.navigation.navigate('Scan Face')}>
              Back
            </Button>
          </View>
        )}
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  noaccess: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
