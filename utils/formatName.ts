export const formatName = (fullName: string) => {
  const paths = fullName.split(' ');
  return `${paths[0]}${paths.length > 1 ? ` ${paths[paths.length - 1]}` : ''}`;
};
