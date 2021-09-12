import { Socket } from 'socket.io';
import { verifyToken } from '../services/jwt';

export const authSocket = (socket: Socket) => {
  if (socket.handshake.query) {
    if (socket.handshake.query.token) {
      const user = verifyToken(socket.handshake.query.token as string);
      if (user) {
        return {
          id: socket.id,
          name: (user as { id: string; name: string }).name,
          userId: (user as { id: string; name: string }).id,
        };
      }
    }
  }
  return null;
};
