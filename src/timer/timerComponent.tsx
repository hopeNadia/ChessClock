import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

type Props = {time: string; isTimeRunning: boolean};

const TimerComponent = ({time, isTimeRunning}: Props) => {
  const containerStyle = isTimeRunning ? [styles.container, styles.runningTimeContainer] : styles.container;
  return (
    <View style={containerStyle}>
      <Text style={styles.timerText}>timer: {time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c2c2c2'
  },
  runningTimeContainer: {
    backgroundColor: '#ffe9c2'
  },
  timerText: {
    color: 'black',
    fontSize: 30
  }
});

export default TimerComponent;
