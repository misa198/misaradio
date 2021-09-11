import { baseUrl } from 'constants/config';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from './hooks';

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const isLoggedIn = useAppSelector((state) => state.auth.login.loggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const token = Cookies.get('token');
      if (token) {
        setSocket(
          io(baseUrl, {
            query: {
              token,
            },
          }),
        );
      }
    }
  }, [isLoggedIn]);

  return socket;
};

export default useSocket;
