import {MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {getDeadlineDate, getRestOfTime} from '../services/timeHelpers';

const useTimer = (timeMs: number) => {
  let interval = useRef();
  let pausedRestOfTime: MutableRefObject<number> = useRef(0);
  let deadlineDate: MutableRefObject<Date> = useRef(null);
  const id = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isTimeOver, setIsTimeOver] = useState<boolean>(false);
  const [timeText, setTimeText] = useState<string>('');

  useEffect(() => {
    if (!isActive && !isTimeOver) {
      const restOfTime = getRestOfTime(getDeadlineDate(timeMs));
      setTimeText(restOfTime.text);
    }
  }, [isActive, isTimeOver, timeMs]);

  const runTimer = useCallback((entTime: Date) => {
    const updateTimer = () => {
      var time = getRestOfTime(entTime);
      setTimeText(time.text);

      if (time.ms <= 0) {
        setIsTimeOver(true);
        setIsActive(false);
        clearInterval(interval.current);
      }
    };
    updateTimer();

    interval.current = setInterval(updateTimer, 1000);
  }, []);

  const resume = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);

      deadlineDate.current = new Date(Date.parse(new Date()) + pausedRestOfTime.current);

      runTimer(deadlineDate.current);
    }
  }, [isPaused, runTimer]);

  const start = useCallback(() => {
    if (isActive) {
      resume();
    } else {
      setIsTimeOver(false);
      setIsActive(true);
      deadlineDate.current = getDeadlineDate(timeMs);

      runTimer(deadlineDate.current);
    }
  }, [isActive, resume, runTimer, timeMs]);

  const pause = useCallback(() => {
    if (isActive && !isPaused) {
      setIsPaused(true);
      clearInterval(interval.current);
      pausedRestOfTime.current = getRestOfTime(deadlineDate.current).ms;
    }
  }, [isActive, isPaused]);

  const reset = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setIsTimeOver(false);
    clearInterval(interval.current);
    deadlineDate.current = null;
    pausedRestOfTime.current = 0;
  }, []);

  return {id, timeText, isTimeOver, start, pause, reset};
};

export default useTimer;
