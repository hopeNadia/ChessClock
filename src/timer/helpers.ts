export const getRestOfTime = (endtime: Date): {text: string; ms: number} => {
  const endTimeMs = Date.parse(endtime);

  if (isNaN(endTimeMs)) return {text: 'Please, set right time!', ms: 0};

  const timeMs = endTimeMs - Date.parse(new Date());
  var minutes = Math.floor(timeMs / 60000);
  var seconds = Math.floor((timeMs % 60000) / 1000);

  const minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return {text: `${minutesText}:${secondsText}`, ms: timeMs};
};

export const getDeadlineDate = (timeMinutes: number): Date => {
  const currentTime = Date.parse(new Date());
  return new Date(currentTime + timeMinutes * 60 * 1000);
};
