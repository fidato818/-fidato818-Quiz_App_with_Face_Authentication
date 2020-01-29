import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { connect } from 'react-redux';

export default class Splash extends Component {
  constructor(props) {
    super(props);

    setTimeout(() => {
      // props.navigation.navigate('Dashboard');
      props.navigation.navigate('Quiz');
      // props.navigation.navigate('ScanAgain');
      }, 3000);
    // }, 500);
    // }

    // componentDidMount() {
    //   Font.loadAsync({
    //     'ubuntu-regular': require('../../assets/fonts/Ubuntu-R.ttf'),
    //   });
    // }
  } 
  render() {
    return (
      <ImageBackground
        source={require('../../../assets/images/kobu-agency-ipARHaxETRk-unsplash.jpg')}
        style={styles.backgroundImage}>
        <View style={{ backgroundColor: 'rgba(19,127,144, 0.7)', flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                flex: 1,
                width: '70%',
                height: '70%',
                resizeMode: 'contain',
              }}
              source={require('../../../assets/icons/kisspng-computer-icons-brain-number-quiz-vector-graphics-i-nootropics-club-smart-drugs-about-nootropics-club-5be61866954850.6096068315418061826115.png')}
            />
          </View>

          <View style={styles.bottomView}>
            <Text style={styles.textStyle}>Welcome to Quiz App!</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     status: state.netStatus.connection,
//   };
// };

// export default connect(
//   mapStateToProps,
//   null
// )(Splash);
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  // bottom: {
  //   // justifyContent: 'flex-end',
  //   marginBottom: 20,
  // },
  bottomView: {
    width: '100%',
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    fontFamily: 'ubuntu-regular',
    fontSize: 16,
    color: 'black',
  },
});
