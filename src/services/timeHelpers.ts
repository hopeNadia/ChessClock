export const getRestOfTime = (endtime: Date): {text: string; ms: number} => {
  const endTimeMs = Date.parse(endtime);

  if (isNaN(endTimeMs)) return {text: 'Please, set right time!', ms: 0};

  const timeMs = endTimeMs - Date.parse(new Date());

  if (timeMs < 0) {
    return {
      text: `00:00`,
      ms: 0
    };
  }
  var minutes = Math.floor(timeMs / 60000);
  var seconds = Math.floor((timeMs % 60000) / 1000);

  const minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return {text: `${minutesText}:${secondsText}`, ms: timeMs};
};

export const getDeadlineDate = (timeMs: number): Date => {
  const currentTime = Date.parse(new Date());
  return new Date(currentTime + timeMs);
};

export const msToMinutes = (ms: number) => {
  return ms / 60 / 1000;
};

export const minutesToMs = (minutes: number) => {
  return minutes * 60 * 1000;
};
