import * as React from 'react';
import {
  View,
  StyleSheet,
  
} from 'react-native';
import Constants from 'expo-constants';

import {
  Card,
  Button, 
  Text,  
  Paragraph, 
  Title,
} from 'react-native-paper';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
              <Text style={{ color: 'white' }}>Start Quiz</Text>
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
