import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';
import * as ImagePicker from 'expo-image-picker';
import {
  Button,  
  Provider as PaperProvider,  
  Snackbar, 
  ActivityIndicator,
} from 'react-native-paper';
import ProgressBar from 'react-native-progress/Bar';
const win = Dimensions.get('window');
const ratio = win.width / 541;
export default class FaceScan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      visible: false,
      iamge: null,
      uploading: false,
      scanned: false,
      open: false,
      toggle: false,
      shown: false,
      visibleSnackbar: false,
      showIndicator: false,
    };
  }

  _maybeRenderImage = () => {
    let { image } = this.state;

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
    this.setState({ showIndicator: true });
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
        if (detect.faces.length && !pickerResult.cancelled) {
          this.setState({
            image: pickerResult.uri,
            visibleSnackbar: true,
            showIndicator: false,
          });
        } else if (detect.faces.length === 0) {
          Alert.alert(
            'Quiz App',
            'Please Capture Your face Image to access Quiz',
            [
              {
                text: 'OK',
                onPress: () =>
                  this.setState({
                    showIndicator: false,
                    image: '',
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
        // Alert.alert('Quiz App', `${e}`);
      }
      if (pickerResult.cancelled) {
        this.setState({
          showIndicator: false,
        });
      }

      // if (!pickerResult.cancelled) {
      //   this.setState({
      //     image: pickerResult.uri,

      //     showIndicator: false,
      //   });
      // }

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
    } = this.state;
    console.log('image', image);

    if (hasCameraPermission === null) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Requesting for camera permission</Text>
        </View>
      );
    }
    if (hasCameraPermission === false) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text> No access to camera</Text>
        </View>
      );
    }
    return (
      <PaperProvider>
        {this.state.showIndicator ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View>{this._maybeRenderImage()}</View>
        )}

        <View style={styles.bottomView}>
          {image ? (
            <View>
              <Button
                mode="contained"
                color="#3498db"
                disabled={false}
                onPress={() =>
                  this.props.navigation.navigate('Quiz', {
                    imageUri: image,
                  })
                }>
                <Text style={{ color: 'white' }}>Start Quiz</Text>
              </Button>
            </View>
          ) : (
            <View>
              <Image
                style={{ width: win.width }}
                source={require('../../../681-512 1.png')}
                resizeMode="contain"
              />

              <Button
                mode="contained"
                color="#3498db"
                onPress={() => this._takePhoto()}>
                <Text style={{ color: 'white' }}>
                  Take Snap then Start Quiz
                </Text>
              </Button>
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

  bottomView: {
    width: '100%',
    // height: 50,

    justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
