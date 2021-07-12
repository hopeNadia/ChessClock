import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import IntNumberInput from '../controls/intNumberInput';

type Props = {
  children: React.ReactNode;
  defaultTimeValue: number;
  startDisabled: boolean;
  switchDisabled: boolean;
  onChangeTime: (value: number) => void;
  start: () => void;
  reset: () => void;
  pause: () => void;
  changeClock: () => void;
};
const CheccClockComponent = ({
  children,
  startDisabled,
  switchDisabled,
  defaultTimeValue,
  onChangeTime,
  start,
  reset,
  pause,
  changeClock
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={changeClock}>
        {children}
      </TouchableOpacity>
      <View style={styles.controlsContainer}>
        <View style={styles.contentContainer}>
          <Button title={'Start'} onPress={start} disabled={startDisabled} />
          <Button title={'Switch'} onPress={changeClock} disabled={switchDisabled} />
          <Button title={'Pause'} onPress={pause} />
          <Button title={'Reset'} onPress={reset} />
        </View>

        <Text style={styles.switchText}>Switch timers with 'Switch' button or press timers zone.</Text>

        <IntNumberInput
          onSubmitCallback={onChangeTime}
          title={'Set time in minutes: '}
          defaultValue={defaultTimeValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  controlsContainer: {
    padding: 10
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  switchText: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.5)'
  }
});

export default CheccClockComponent;
