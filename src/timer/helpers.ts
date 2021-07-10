export const getRestOfTime = (endtime: Date): {text: string; ms: number} => {
  const timeMs = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((timeMs / 1000) % 60);
  const minutes = Math.floor((timeMs / 1000 / 60) % 60);

  const minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return {text: `${minutesText}:${secondsText} `, ms: timeMs};
};

export const getDeadlineDate = (timeMinutes: number): Date => {
  const currentTime = Date.parse(new Date());
  return new Date(currentTime + timeMinutes * 60 * 1000);
};
