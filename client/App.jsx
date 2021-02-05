import React from 'react';
import { SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import config from './config'
import firebase from 'firebase'

// Redux
import store from './redux/store'
import {Provider} from 'react-redux'

// Screen

import IndexScreen from './screen'


let axiosDefaults = require("axios/lib/defaults");
axiosDefaults.baseURL =`http://${config.IPAddress}:3003`;

const Stack = createStackNavigator()

if (firebase.apps.length === 0) {
  firebase.initializeApp(config.firebaseConfig)
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>

          <IndexScreen/>

      </NavigationContainer>
    </Provider>
  );
}
