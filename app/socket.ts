import { baseUrl } from 'constants/config';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from './hooks';

let initialSocket: Socket | null = null;

export const useInitSocket = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.login.loggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      const token = Cookies.get('token');
      if (token) {
        initialSocket = io(baseUrl, {
          query: {
            token,
          },
        });
      }
    } else {
      initialSocket = null;
    }
  }, [isLoggedIn]);
};

const useSocket = () => {
  return initialSocket;
};

export default useSocket;
