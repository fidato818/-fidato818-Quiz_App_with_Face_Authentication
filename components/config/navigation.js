import React, { Component } from 'react';
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
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import SplashScreen from '../screens/Splash/index';
import HomeScreen from '../screens/Home/index';
import FaceScanScreen from '../screens/FaceScan/index';
import QuestionsScreen from '../screens/Questions/index';
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

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: {
      screen: DashboardNavigator,
    },
  },

  {
    defaultNavigationOptions: ({ navigation, screenProps }) => {
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

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: SplashScreen },

  // Dashboard: { screen: AppDrawerNavigator },
  Dashboard: { screen: DashboardStackNavigator },
});

const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;
