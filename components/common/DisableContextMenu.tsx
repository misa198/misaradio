import { useEffect } from 'react';

const DisableContextMenu = () => {
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }, []);

  return null;
};

export default DisableContextMenu;
