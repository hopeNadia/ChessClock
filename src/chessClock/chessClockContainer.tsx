import React, {useState, useRef} from 'react';
import CheccClockComponent from './chessClockComponent';

import {Timer, useTimer} from '../timer';

const CheccClockContainer = () => {
  let currentTimerIndex = useRef<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [playMinutes, setPlayMinutes] = useState<number>(10);

  const {timeText: timeText1, start: start1, pause: pause1, reset: reset1} = useTimer(playMinutes);
  const {timeText: timeText2, start: start2, pause: pause2, reset: reset2} = useTimer(playMinutes);

  const startClock = () => {
    if (isStarted && isPaused) {
      if (currentTimerIndex.current === 0) {
        start1();
      } else {
        start2();
      }
    } else if (!isStarted) {
      currentTimerIndex.current = 0;
      start1();
      setIsStarted(true);
    }
    setIsPaused(false);
  };

  const onChangeClock = () => {
    if (isStarted) {
      setIsPaused(false);

      if (currentTimerIndex.current === 0) {
        pause1();
        start2();
        currentTimerIndex.current = 1;
      } else {
        pause2();
        start1();
        currentTimerIndex.current = 0;
      }
    }
  };

  const pauseClock = () => {
    setIsPaused(true);
    pause1();
    pause2();
  };

  const resetClock = () => {
    reset1();
    reset2();
    setIsStarted(false);
  };

  const changeTime = (text: string) => {
    if (isStarted) {
      resetClock();
    }

    const playMinutesNumber = text ? parseInt(text) : 0;
    setPlayMinutes(playMinutesNumber);
  };

  return (
    <CheccClockComponent
      playMinutes={playMinutes}
      changeTime={changeTime}
      start={startClock}
      pause={pauseClock}
      reset={resetClock}
      changeClock={onChangeClock}
      startDisabled={isStarted && !isPaused}
      switchDisabled={!isStarted}>
      <Timer time={timeText1} isTimeRunning={currentTimerIndex.current === 0} />
      <Timer time={timeText2} isTimeRunning={currentTimerIndex.current === 1} />
    </CheccClockComponent>
  );
};

export default CheccClockContainer;
