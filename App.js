import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CheccClock from './src/chessClock';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CheccClock />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1}
});

export default App;
