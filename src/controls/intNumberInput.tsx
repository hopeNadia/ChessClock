import React, {useState} from 'react';
import {useCallback, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

type Props = {
  onSubmitCallback: (value: number) => void;
  title?: string;
  defaultValue?: number;
};

const IntNumberInput = React.memo(({onSubmitCallback, title = 'Set number:', defaultValue = 0}: Props) => {
  const input = useRef();
  const [valueNumber, setValueNumber] = useState<number>(defaultValue);

  const onChangeTime = useCallback((text: string) => {
    const value = text ? parseInt(text) : 0;

    setValueNumber(value);
  }, []);

  const onSubmit = useCallback(() => {
    input.current?.blur();
    onSubmitCallback(valueNumber);
  }, [onSubmitCallback, valueNumber]);

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.timerText}>{title}</Text>
      <TextInput
        ref={input}
        value={valueNumber.toString()}
        onChangeText={onChangeTime}
        keyboardType="numeric"
        style={styles.setTimeInput}
        onSubmitEditing={() => {
          input.current?.blur();
        }}
      />
      <Button title={'Submit'} onPress={onSubmit} />
    </View>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  timerText: {
    fontSize: 17
  },
  setTimeInput: {
    flex: 1,
    fontSize: 17,
    borderBottomWidth: 1
  },
  buttonText: {
    color: 'black',
    textDecorationLine: 'underline'
  }
});

export default IntNumberInput;
