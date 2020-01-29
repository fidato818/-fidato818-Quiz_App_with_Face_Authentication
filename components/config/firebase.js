import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAUOXha6yzw93ExiauY93VjcotiVx70cpE',
  authDomain: 'react-login818.firebaseapp.com',
  databaseURL: 'https://react-login818.firebaseio.com',
  projectId: 'react-login818',
  storageBucket: 'react-login818.appspot.com',
  messagingSenderId: '693313502084',
  appId: '1:693313502084:web:89c4045f232db0ca',
};

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());