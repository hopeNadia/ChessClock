import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';

import TimerComponent from './timerComponent';

type Props = {
  timeMinutes: number;
};

const getRestOfTime = (endtime: Date): {text: string; ms: number} => {
  const timeMs = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((timeMs / 1000) % 60);
  const minutes = Math.floor((timeMs / 1000 / 60) % 60);

  const minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return {text: `${minutesText}:${secondsText} `, ms: timeMs};
};

const getDeadlineDate = (timeMinutes: number): Date => {
  const currentTime = Date.parse(new Date());
  return new Date(currentTime + timeMinutes * 60 * 1000);
};

const TimerContainer = ({timeMinutes}: Props) => {
  let interval = useRef();
  let pausedRestOfTime: MutableRefObject<number> = useRef(0);
  let deadlineDate: MutableRefObject<Date> = useRef(null);

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timeText, setTimeText] = useState<string>('');

  useEffect(() => {
    if (!isActive) {
      const currentRemains = getRestOfTime(getDeadlineDate(timeMinutes));
      setTimeText(currentRemains.text);
    }
  }, [isActive, timeMinutes]);

  const runClock = useCallback((entTime: Date) => {
    const updateClock = () => {
      var time = getRestOfTime(entTime);
      setTimeText(time.text);

      if (time.ms <= 0) {
        setIsActive(false);
        clearInterval(interval.current);
      }
    };
    updateClock();

    interval.current = setInterval(updateClock, 1000);
  }, []);

  const resume = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);

      deadlineDate.current = new Date(Date.parse(new Date()) + pausedRestOfTime.current);

      runClock(deadlineDate.current);
    }
  }, [isPaused, runClock]);

  const pause = useCallback(() => {
    if (!isPaused) {
      setIsPaused(true);
      clearInterval(interval.current);
      pausedRestOfTime.current = getRestOfTime(deadlineDate.current).ms;
    }
  }, [isPaused]);

  const reset = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    clearInterval(interval.current);
    deadlineDate.current = null;
    pausedRestOfTime.current = 0;
  }, []);

  const start = useCallback(() => {
    if (isActive) {
      resume();
    } else {
      setIsActive(true);
      deadlineDate.current = getDeadlineDate(timeMinutes);

      runClock(deadlineDate.current);
    }
  }, [isActive, resume, runClock, timeMinutes]);

  return <TimerComponent time={timeText} isTimeRunning={isActive && !isPaused} />;
};

export default TimerContainer;
