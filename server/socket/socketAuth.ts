import { Socket } from 'socket.io';
import { verifyToken } from '../services/jwt';

export const authSocket = (socket: Socket) => {
  if (socket.handshake.query) {
    if (socket.handshake.query.token) {
      const user = verifyToken(socket.handshake.query.token as string);
      if (user) {
        return {
          id: socket.id,
          name: (user as { email: string; name: string }).name,
        };
      }
    }
  }
  return null;
};
