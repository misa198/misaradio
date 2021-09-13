import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }, []);

  return null;
};
