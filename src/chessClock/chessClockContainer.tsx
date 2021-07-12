import React, {useState, useRef, useMemo, useCallback} from 'react';
import CheccClockComponent from './chessClockComponent';

import {Timer, useTimer} from '../timer';
import {minutesToMs, msToMinutes} from '../services/timeHelpers';

const defaultPlayTimeMs = 600000;

const CheccClockContainer = () => {
  let currentTimerIndex = useRef<number>(0);

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [playTimeMs, setPlayTimeMs] = useState<number>(defaultPlayTimeMs);

  const timer1 = useTimer(playTimeMs);
  const timer2 = useTimer(playTimeMs);
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

  const pauseClock = useCallback(() => {
    setIsPaused(true);
    timers.forEach(timer => timer.pause());
  }, [timers]);

  const resetClock = useCallback(() => {
    setIsStarted(false);
    currentTimerIndex.current = 0;
    timers.forEach(timer => timer.reset());
  }, [timers]);

  const changeClock = useCallback(() => {
    if (isStarted) {
      setIsPaused(false);

      timers[currentTimerIndex.current].pause();

      currentTimerIndex.current =
        currentTimerIndex.current + 1 <= timers.length - 1 ? currentTimerIndex.current + 1 : 0;

      timers[currentTimerIndex.current].start();
    }
  }, [isStarted, timers]);

  const onChangeTime = useCallback(
    (numberValue: number) => {
      if (isStarted) {
        resetClock();
      }
      setPlayTimeMs(minutesToMs(numberValue));
    },
    [isStarted, resetClock]
  );

  return (
    <CheccClockComponent
      defaultTimeValue={msToMinutes(defaultPlayTimeMs)}
      onChangeTime={onChangeTime}
      start={startClock}
      pause={pauseClock}
      reset={resetClock}
      changeClock={changeClock}
      startDisabled={isStarted && !isPaused}
      switchDisabled={!isStarted}>
      {timers.map((timer, index) => (
        <Timer
          key={timer.id}
          time={timer.timeText}
          isTimeRunning={currentTimerIndex.current === index}
          isTimeOver={timer.isTimeOver}
        />
      ))}
    </CheccClockComponent>
  );
};

export default CheccClockContainer;
