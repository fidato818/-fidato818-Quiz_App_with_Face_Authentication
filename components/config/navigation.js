import React, { Component, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';
import { connect, useDispatch } from 'react-redux';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';

// import MainPageScreen from '../screens/mainPage';
import SplashScreen from '../screens/Splash/index';
import HomeScreen from '../screens/Home/index';
import FaceScanScreen from '../screens/FaceScan/index';
import QuestionsScreen from '../screens/Questions/index';
import LoginScreen from '../screens/Login/index';
import { logout_user, remove_user } from '../store/actions/index';
import {
  IconButton,
  Colors,
  Button,
  Provider as PaperProvider,
  Drawer,
  Divider,
  DefaultTheme,
} from 'react-native-paper';
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#008080',
    accent: '#f1c40f',
  },
};
const DashboardNavigator = createStackNavigator(
  {
    Dashboard: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    'Scan Face': {
      screen: FaceScanScreen,
      navigationOptions: {
        header: null,
      },
    },
    Quiz: {
      screen: QuestionsScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    },
  }
);

const AuthNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: null,
      header: null,
    },
  },
});
// const DashboardTabNavigator = createStackNavigator(
//   {
//     Dashboard: {
//       screen: HomeScreen,
//       navigationOptions: {
//         header: null,
//       },
//     },
//     Camera: {
//       screen: FaceScanScreen,
//       navigationOptions: {
//         header: null,
//       },
//     },
//     Quiz: {
//       screen: QuestionsScreen,
//       navigationOptions: {
//         header: null,
//       },
//     },
//   }
//   // {
//   //   navigationOptions: ({ navigation }) => {
//   //     const { routeName } = navigation.state.routes[navigation.state.index];
//   //     return {
//   //       headerTitle: routeName,
//   //     };
//   //   },
//   // }
// );
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: {
      screen: DashboardNavigator,
    },
  },

  {
    defaultNavigationOptions: ({ navigation, screenProps }) => {
      // console.log('navigation', navigation);
      // console.log('screenProps', screenProps);
      return {
        headerRight: (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              left: Dimensions.get('window').height < 667 ? '8%' : '3%',
              // backgroundColor: 'red',
              // width: '100%',
              marginRight: 10,
            }}>
            <View>
              {screenProps.user ? (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require('../../assets/icons/icons8-export-24.png')}
                />
              ) : (
                <Text />
              )}
            </View>
          </TouchableOpacity>
        ),
        headerLeft: (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{
              left: Dimensions.get('window').height < 667 ? '8%' : '3%',
              // backgroundColor: 'red',
              width: '100%',
              marginLeft: 10,
            }}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/icons/icons8-menu-24.png')}
            />
          </TouchableOpacity>
        ),
      };
    },
  }
);

const CustomDrawerContentComponent = props => {
  // console.log('props in custom component are: ', props);
  let activeIndex = props.navigation.state.index;
  let activeRouteName = props.navigation.state.routes[activeIndex].routeName;

  const [activeRoute, setActiveRoute] = useState('');

  useEffect(() => {
    setActiveRoute(activeRouteName);
  }, [activeRouteName, activeRoute]);

  return (
    <ScrollView>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{
              width: 150,
              height: 150,
              marginTop: 20,
              // marginLeft: 50,
            }}
            source={require('../../assets/icons/icons8-test-account-64.png')}
          />
        </View>
        {props.screenProps.user ? (
          <View>
            <Text>Hello {props.screenProps.user}</Text>
          </View>
        ) : (
          <View>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              Please Login
            </Text>
          </View>
        )}
        <Divider />
        <Drawer.Section>
          <Drawer.Item
            icon="add"
            label="Home"
            active={
              activeRouteName === 'Dashboards'
                ? { colors: { primary: Colors.red500 } }
                : { colors: { accent: Colors.red500 } }
            }
            onPress={() => props.navigation.navigate('Dashboard')}
          />
          <Drawer.Item
            icon="add"
            label="Camera"
            active={
              activeRouteName !== 'Dashboards' && activeRouteName == 'Camera'
                ? 'true'
                : 'true'
            }
            onPress={() => props.navigation.navigate('Camera')}
          />
          <Drawer.Item
            icon="add"
            label="My Device"
            active={activeRouteName === 'My Device' ? 'true' : 'true'}
            onPress={() => props.navigation.navigate('My Device')}
          />
          <Drawer.Item
            icon="add"
            label="My Robbed History"
            active={activeRouteName === 'My Robbed History' ? 'true' : 'true'}
            onPress={() => props.navigation.navigate('My Robbed History')}
          />
          <Drawer.Item
            icon="add"
            label="All Robbed History"
            active={activeRouteName === 'All Robbed History' ? 'true' : 'true'}
            onPress={() => props.navigation.navigate('All Robbed History')}
          />
          <View style={{ justifyContent: 'flex-end', bottom: 0 }}>
            <Drawer.Item
              icon={require('../../assets/icons/icons8-export-24.png')}
              label="LOGOUT"
              active={
                activeRouteName === 'Logout'
                  ? { colors: { background: Colors.red500 } }
                  : { colors: { background: Colors.red500 } }
              }
              onPress={() =>
                Alert.alert(
                  'Quiz App',
                  'Do you want to logout?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        props.navigation.dispatch(DrawerActions.closeDrawer());
                      },
                    },
                    {
                      text: 'Confirm',
                      onPress: () => {
                        AsyncStorage.clear();

                        // props.navigation.signOut();
                        // props.signOut();
                        // logout_user();
                        props.navigation.dispatch(DrawerActions.closeDrawer());
                        props.navigation.navigate('Login');
                      },
                    },
                  ],
                  { cancelable: false }
                )
              }
            />
          </View>
        </Drawer.Section>
      </SafeAreaView>
    </ScrollView>
  );
};

const AppDrawerNavigator = createDrawerNavigator(
  {
    DashboardStac: {
      screen: DashboardStackNavigator,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    Dashboard: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    FaceScan: {
      screen: FaceScanScreen,
      navigationOptions: {
        header: null,
      },
    },

    Quiz: {
      screen: QuestionsScreen,
      navigationOptions: {
        header: null,
      },
    },
  },

  {
    headerMode: 'none',
    gesturesEnabled: false,
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: SplashScreen },
  Login: { screen: AuthNavigator },
  // Dashboard: { screen: AppDrawerNavigator },
  Dashboard: { screen: DashboardStackNavigator },
});

const AppContainer = createAppContainer(AppSwitchNavigator);
// export default AppContainer;
const mapDispatchToProps = dispatch => {
  // console.log('dispatch', logout_user);
  return {
    logout_user: user => dispatch(logout_user(user)),
    remove_user: user => dispatch(remove_user(user)),
  };
};
const mapStateToProps = state => {
  // console.log('state', state.user.user.email)
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   paddingTop: Constants.statusBarHeight,
  //   backgroundColor: '#ecf0f1',
  //   padding: 8,
  // },
  // paragraph: {
  //   margin: 12,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
});
