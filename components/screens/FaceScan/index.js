import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as ImagePicker from 'expo-image-picker';

import {
  Button,
  Modal,
  Provider as PaperProvider,
  FAB,
  Card,
  Portal,
  IconButton,
  Colors,
  Paragraph,
  Title,
  Snackbar,
} from 'react-native-paper';
import ProgressBar from 'react-native-progress/Bar';

export default class FaceScan extends React.Component {
  state = {
    hasCameraPermission: null,
    visible: false,
    image:
      'https://cdn0.iconfinder.com/data/icons/business-management-and-growth-13/64/681-512.png',
    // image:
    //   'https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    uploading: false,

    scanned: false,
    open: false,
    toggle: false,
    shown: false,
    visibleSnackbar: false,
  };

  _maybeRenderImage = () => {
    let { image, faceDummy } = this.state;

    if (!image) {
      return;
    }

    return (
      <View style={styles.maybeRenderContainer}>
        <View style={styles.maybeRenderImageContainer}>
          <View
            style={{
              height: 460,
              // width: '100%',
              // height: hp('100%'), // 70% of height device screen
              // width: '100%', // 80% of width device screen
              position: 'relative',
              overflow: 'hidden',
              // backgroundColor: 'red',
              // alignItems: 'center',
            }}>
            <Image
              indicator={ProgressBar}
              resizeMode="contain"
              resizeMethod="auto"
              source={{ uri: image }}
              style={{
                position: 'absolute',
                bottom: 0,
                height: '100%',
                width: '100%',
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  _takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        mediaType: 'Images',
      });
      try {
        let detect = await this.detectFaces(pickerResult.uri);
        console.log('detect', detect.faces);
        if (detect.faces.length) {
          this.setState({ visibleSnackbar: true });
        } else if (detect.faces.length === 0) {
          Alert.alert(
            'Quiz App',
            'Please Capture Your face Image to access Quiz',
            [
              {
                text: 'OK',
                onPress: () =>
                  this.setState({
                    toggle: !this.state.toggle,
                    image:
                      'https://cdn0.iconfinder.com/data/icons/business-management-and-growth-13/64/681-512.png',
                  }),
              },
            ],
            { cancelable: false }
          );
          this.setState({
            detect: '',
          });
        }
      } catch (e) {
        console.log(e);
      }

      if (!pickerResult.cancelled) {
        this.setState({
          image: pickerResult.uri,

          toggle: !this.state.toggle,
        });
      }

      this.uploadImageAsync(pickerResult.uri);
    }
  };

  detectFaces = async imageUri => {
    const options = {
      mode: FaceDetector.Constants.Mode.fast,
      detectLandmarks: FaceDetector.Constants.Landmarks.none,
      runClassifications: FaceDetector.Constants.Classifications.none,
      minDetectionInterval: 100,
      tracking: true,
    };
    return await FaceDetector.detectFacesAsync(imageUri, options);
  };

  render() {
    let {
      image,
      hasCameraPermission,
      scanned,
      faceDummy,
      detect,
      visibleSnackbar,
    } = this.state;
    console.log(detect);

    if (hasCameraPermission === null) {
      return (
        <Text
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Requesting for camera permission
        </Text>
      );
    }
    if (hasCameraPermission === false) {
      return (
        <Text
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          No access to camera
        </Text>
      );
    }
    return (
      <PaperProvider>
        <View>
          <View>{this._maybeRenderImage()}</View>
        </View>
        <View style={styles.bottomView}>
          {this.state.toggle && image ? (
            <View>
              {detect ? (
                <Button
                  mode="contained"
                  color="#3498db"
                  disabled={false}
                  onPress={() =>
                    this.props.navigation.navigate('Quiz', {
                      imageUri: image,
                    })
                  }>
                  Start Quiz
                </Button>
              ) : (
                <Button
                  mode="contained"
                  color="#3498db"
                  disabled
                  onPress={() =>
                    this.props.navigation.navigate('Quiz', {
                      imageUri: image,
                    })
                  }>
                  Start Quiz
                </Button>
              )}
            </View>
          ) : (
            <View>
              {!this.state.toggle && image && (
                <Button
                  mode="contained"
                  color="#3498db"
                  onPress={() => this._takePhoto()}>
                  Take Snap then Start Quiz
                </Button>
              )}
            </View>
          )}
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
            Scanned Successfully!
          </Snackbar>
        </View>
      </PaperProvider>
    );
  }
}
const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  //   flex: 6,
  //   justifyContent: 'center',
  //  fontFamily: 'ubuntu-regular',
  // },
  // exampleText: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   fontSize: 20,
  //   marginBottom: 20,
  //   marginHorizontal: 15,
  //   textAlign: 'center',
  // },
  // maybeRenderUploading: {
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.4)',
  //   justifyContent: 'center',
  // },
  maybeRenderContainer: {
    // borderRadius: 3,
    elevation: 2,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    // width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  // maybeRenderImage: {
  //   // marginTop: 10,
  //   // marginLeft: 10,
  //   height: 520,
  //   width: width,
  // },

  // shadow: {
  //   // Sweet! Android shadow!
  //   elevation: 5,
  // },
  // backgroundImage: {
  //   flex: 1,
  //   width: null,
  //   height: null,
  //   resizeMode: 'cover',
  //   fontFamily: 'ubuntu-regular',
  // },

  bottomView: {
    width: '100%',
    // height: 50,

    justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  // textStyle: {
  //   fontFamily: 'ubuntu-regular',
  //   fontSize: 16,
  //   color: 'white',
  // },
});
