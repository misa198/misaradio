import { baseUrl } from 'constants/config';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from './hooks';

let initialSocket: Socket | null = null;

export const useInitSocket = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.login.loggedIn);
  const [socket, setSocket] = useState<Socket | null>(null);
  initialSocket = socket;

  useEffect(() => {
    if (isLoggedIn) {
      const token = Cookies.get('token');
      if (token) {
        setSocket(
          io(baseUrl, {
            query: {
              token,
            },
            transports: ['websocket'],
          }),
        );
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
