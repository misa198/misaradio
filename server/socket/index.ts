import { Socket } from 'socket.io';
import { httpServer } from '../index';
import * as roomsService from '../services/rooms';
import { authSocket } from './socketAuth';
const socketIO = require('socket.io');

export const io = socketIO(httpServer);

io.on('connection', (socket: Socket) => {
  // Leave all rooms that be created or joined when disconnected
  socket.on('disconnect', async () => {
    const roomId = roomsService.leaveRooms(socket.id);
    io.to(roomId).emit('leave-room', {
      userId: socket.id,
    });
  });

  // Create room
  socket.on('create-room', async (payload: { name: string }) => {
    const user = authSocket(socket);
    if (!user) return socket.emit('error', 'Unauthorized');
    const roomId = roomsService.createRoom(payload.name, user);
    socket.emit('create-room-success', { roomId });
  });

  // Join room
  socket.on('join-room', async (payload: { roomId: string }) => {
    const user = authSocket(socket);
    if (!user) return socket.emit('error', 'Unauthorized');
    const room = await roomsService.joinRoom(payload.roomId, user);
    socket.emit('join-room-success', { room });
  });
});
