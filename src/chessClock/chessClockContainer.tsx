import React, {useState, useRef, useMemo, useCallback} from 'react';
import CheccClockComponent from './chessClockComponent';

import {Timer, useTimer} from '../timer';

const CheccClockContainer = () => {
  let currentTimerIndex = useRef<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [playMinutes, setPlayMinutes] = useState<number>(10);

  const timer1 = useTimer(playMinutes);
  const timer2 = useTimer(playMinutes);

  const timers = useMemo(() => [timer1, timer2], [timer1, timer2]);

  const startClock = useCallback(() => {
    if (isStarted && isPaused) {
      timers[currentTimerIndex.current].start();
    } else if (!isStarted) {
      currentTimerIndex.current = 0;
      timers[currentTimerIndex.current].start();
      setIsStarted(true);
    }
    setIsPaused(false);
  }, [isPaused, isStarted, timers]);

  const onChangeClock = useCallback(() => {
    if (isStarted) {
      setIsPaused(false);

      timers[currentTimerIndex.current].pause();

      currentTimerIndex.current =
        currentTimerIndex.current + 1 <= timers.length - 1 ? currentTimerIndex.current + 1 : 0;

      timers[currentTimerIndex.current].start();
    }
  }, [isStarted, timers]);

  const pauseClock = () => {
    setIsPaused(true);
    timers.forEach(timer => timer.pause());
  };

  const resetClock = useCallback(() => {
    setIsStarted(false);
    timers.forEach(timer => timer.reset());
  }, [timers]);

  const onChangeTime = useCallback(
    (text: string) => {
      if (isStarted) {
        resetClock();
      }

      const playMinutesNumber = text ? parseInt(text) : 0;
      setPlayMinutes(playMinutesNumber);
    },
    [isStarted, resetClock]
  );

  return (
    <CheccClockComponent
      playMinutes={playMinutes}
      changeTime={onChangeTime}
      start={startClock}
      pause={pauseClock}
      reset={resetClock}
      changeClock={onChangeClock}
      startDisabled={isStarted && !isPaused}
      switchDisabled={!isStarted}>
      {timers.map((timer, index) => (
        <Timer time={timer.timeText} isTimeRunning={currentTimerIndex.current === index} />
      ))}
    </CheccClockComponent>
  );
};

export default CheccClockContainer;
