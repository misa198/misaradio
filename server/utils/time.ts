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
