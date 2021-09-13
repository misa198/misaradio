export function timeStringToMilliseconds(time: string) {
  const paths = time.split(':').reverse();
  let duration = 0;
  paths.forEach((path, index) => {
    if (index === 0) duration += parseInt(path) * 1000;
    if (index === 1) duration += parseInt(path) * 60 * 1000;
    if (index === 3) duration += parseInt(path) * 60 * 60 * 1000;
  });
  return duration;
}

export function ytDurationToMilliseconds(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (match) {
    const res = match.slice(1).map(function (x) {
      if (x != null) {
        return x.replace(/\D/, '');
      }
    });

    const hours = parseInt(res[0] || '0', 10);
    const minutes = parseInt(res[1] || '0', 10);
    const seconds = parseInt(res[2] || '0', 10);

    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  }
  return 0;
}
