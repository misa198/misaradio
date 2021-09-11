export const formatName = (fullName: string) => {
  const paths = fullName.split(' ');
  return `${paths[0]}`;
};
