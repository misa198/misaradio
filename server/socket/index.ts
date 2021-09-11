import { Socket } from 'socket.io';
import { httpServer } from '../index';
import * as roomsService from '../services/rooms';
import { Song } from '../types/Song';
import { orderSongValidator } from '../validators/rooms/orderSong';
import { createRoomValidator } from '../validators/rooms/createRoom';
import { joinRoomValidator } from '../validators/rooms/joinRoom';
import { authSocket } from './socketAuth';
import socketIO from 'socket.io';

export const io = new socketIO.Server();
io.attach(httpServer);

io.on('connection', (socket: Socket) => {
  // Leave all rooms that be created or joined when disconnected
  socket.on('disconnect', () => {
    try {
      const roomId = roomsService.leaveRooms(socket.id);
      io.to(roomId).emit('leave-room', {
        userId: socket.id,
      });
    } catch (e: any) {
      socket.emit('error', e.message);
    }
  });

  // Create room
  socket.on('create-room', (payload: { name: string }) => {
    const user = authSocket(socket);
    if (!user) return socket.emit('error', 'Unauthorized');
    try {
      const _payload = createRoomValidator(payload);
      const roomId = roomsService.createRoom(_payload.name, user);
      socket.emit('create-room-success', { roomId });
    } catch (e: any) {
      socket.emit('error', e.message);
    }
  });

  // Join room
  socket.on('join-room', (payload: { roomId: string }) => {
    const user = authSocket(socket);
    if (!user) return socket.emit('error', 'Unauthorized');
    try {
      const _payload = joinRoomValidator(payload);
      const room = roomsService.joinRoom(_payload.roomId, user);
      socket.join(room.id);
      socket.emit('join-room-success', {
        room,
      });
      io.to(_payload.roomId).emit('join-room', {
        user,
      });
    } catch (e: any) {
      socket.emit('error', e.message);
    }
  });

  // Order song
  socket.on('order-song', (payload: { roomId: string; song: Song }) => {
    const user = authSocket(socket);
    if (!user) return socket.emit('error', 'Unauthorized');
    try {
      const { roomId, song } = orderSongValidator(payload);
      const room = roomsService.orderSong(roomId, user.id, song);
      io.in(roomId).emit('order-song-success', {
        room,
      });
    } catch (e: any) {
      socket.emit('error', e.message);
    }
  });
});
