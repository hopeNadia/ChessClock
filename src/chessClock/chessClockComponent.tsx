import React from 'react';
import {StyleSheet, Text, TextInput, View, Button, TouchableOpacity} from 'react-native';

type Props = {
  children: React.ReactNode;
  playMinutes: number;
  startDisabled: boolean;
  switchDisabled: boolean;
  changeTime: (text: string) => void;
  start: () => void;
  reset: () => void;
  pause: () => void;
  changeClock: () => void;
};
const CheccClockComponent = ({
  children,
  playMinutes,
  startDisabled,
  switchDisabled,
  changeTime,
  start,
  reset,
  pause,
  changeClock
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={() => changeClock()}>
        {children}
      </TouchableOpacity>
      <View style={styles.controlsContainer}>
        <View style={styles.contentContainer}>
          <Button title={'Start'} onPress={() => start()} disabled={startDisabled} />
          <Button title={'Switch'} onPress={() => changeClock()} disabled={switchDisabled} />
          <Button title={'Pause'} onPress={() => pause()} />
          <Button title={'Reset'} onPress={() => reset()} />
        </View>

        <Text style={styles.switchText}>Switch timers with 'Switch' button or press timers zone.</Text>

        <View style={styles.contentContainer}>
          <Text style={styles.timerText}>Set time in minutes: </Text>
          <TextInput
            value={playMinutes.toString()}
            onChangeText={changeTime}
            placeholder={'Timer minutes'}
            keyboardType="numeric"
            style={styles.setTimeInput}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  controlsContainer: {
    padding: 20
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  switchText: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.5)'
  },
  timerText: {
    fontSize: 17
  },
  setTimeInput: {
    flex: 1,
    fontSize: 17,
    borderBottomWidth: 1
  }
});
export default CheccClockComponent;
