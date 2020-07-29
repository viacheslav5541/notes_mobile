  
import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator , DrawerNavigatorItems } from 'react-navigation-drawer';
import Authorization from './Authorization';
import Registration from './Registration';
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button,
  SafeAreaView
} from 'react-native';
import Notes from './Notes';
import CustomDrawer from './CustomDrawer';


const DrawerNavigator = createDrawerNavigator({
  Notes: {screen:Notes}
}, {
  navigationOptions:{
    header: null,
    headerLeft: null 
  },
  contentComponent: CustomDrawer
});



const MainNavigator = createStackNavigator({
  Authorization: {screen: Authorization},
  Registration: {screen:Registration},
  DrawerNavigator
}, {
  navigationOptions:{
    header: null,
    headerLeft: null
  }
})

const App = createAppContainer(MainNavigator);

export default App;
