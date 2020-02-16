/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Ticitac from './ticitac'

const App: () => React$Node = () => {
  return (
    <View style={styles.body} >
      <StatusBar backgroundColor="#2d132c" barStyle="light-content" />
    <Ticitac>   
    </Ticitac>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 12,
    backgroundColor: "#2d132c",
  }
});

export default App;