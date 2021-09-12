export function timeNumberToString(time: number) {
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 60 / 60);
  const minutes = Math.floor((totalSeconds - hours * 60 * 60) / 60);
  const seconds = totalSeconds - hours * 60 * 60 - minutes * 60;
  let result = '';
  if (hours > 0) {
    result += hours < 10 ? `0${hours}:` : `${hours}:`;
  }
  if (minutes > 0) {
    result += minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  }
  result += seconds < 10 ? `0${seconds}` : `${seconds}`;
  return result;
}
