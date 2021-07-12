import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

type Props = {
  time: string;
  isTimeRunning: boolean;
  isTimeOver: boolean;
};

const TimerComponent = React.memo(({time, isTimeOver, isTimeRunning}: Props) => {
  let containerStyle: any[] = [styles.container];

  if (isTimeRunning) {
    containerStyle.push(styles.runningTimeContainer);
  }

  if (isTimeOver) {
    containerStyle.push(styles.overTimerContainer);
  }

  return (
    <View style={containerStyle}>
      <Text style={styles.timerText}>{time}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c2c2c2'
  },
  runningTimeContainer: {
    backgroundColor: '#ffe9c2'
  },
  overTimerContainer: {
    backgroundColor: 'red'
  },
  timerText: {
    color: 'black',
    fontSize: 30
  }
});

export default TimerComponent;
