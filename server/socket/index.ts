import { Socket } from 'socket.io';
import { httpServer } from '../index';
import * as roomsService from '../services/rooms';
import * as youtubeService from '../services/youtube';
import * as soundcloundService from '../services/soundcloud';
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
      const foundRoom = roomsService.getRoom(_payload.roomId);
      if (!foundRoom) {
        socket.emit('join-room-fail');
      } else {
        const room = roomsService.joinRoom(_payload.roomId, user);
        socket.join(room.id);
        socket.emit('join-room-success', {
          room,
        });
        socket.to(_payload.roomId).emit('join-room', {
          user,
        });
      }
    } catch (e: any) {
      socket.emit('error', e.message);
    }
  });

  // Order song
  socket.on(
    'order-song',
    async (payload: {
      roomId: string;
      type: 'youtube' | 'soundcloud';
      id: string;
    }) => {
      const user = authSocket(socket);
      if (!user) return socket.emit('error', 'Unauthorized');
      try {
        const { roomId } = orderSongValidator(payload);
        let song: Song;
        if (payload.type === 'youtube') {
          song = await youtubeService.getVideoById(payload.id);
        } else {
          song = await soundcloundService.getSongById(payload.id);
        }
        song.orderBy = user.name;
        roomsService.orderSong(roomId, user.id, song);
        io.to(roomId).emit('order-song-success', {
          song,
        });
      } catch (e: any) {
        socket.emit('error', e.message);
      }
    },
  );
});
