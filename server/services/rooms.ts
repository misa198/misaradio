import { nanoid } from 'nanoid';
import { roomCodeLength } from '../constants/config';
import { Room } from '../entities/Room';
import { Song } from '../types/Song';
import { User } from '../types/User';

const rooms: Room[] = [];

export const getRoom = (roomId: string) => {
  const room = rooms.find((r) => r.id === roomId);
  return room;
};

export const createRoom = (name: string, user: User) => {
  const roomId = nanoid(roomCodeLength);
  const foundRoom = getRoom(roomId);
  if (foundRoom) {
    createRoom(name, user);
  } else {
    const room = new Room(name, roomId, user.id);
    rooms.push(room);
    return roomId;
  }
};

export const joinRoom = (roomId: string, user: User) => {
  const room = getRoom(roomId);
  if (room) {
    const foundUser = room.findUser(user.id);
    if (foundUser) throw { message: 'User already in room' };
    room.addUser(user);
    return room;
  }
  throw { message: 'Room not found' };
};

const leaveRoom = (room: Room, userId: string) => {
  const foundUser = room.findUser(userId);
  if (!foundUser) throw { message: 'User not in room' };
  room.removeUser(userId);
  if (room.users.length === 0) {
    const index = rooms.indexOf(room);
    rooms.splice(index, 1);
  }
};

export const leaveRooms = (userId: string) => {
  const roomsToLeave = rooms.filter(
    (room) => room.findUser(userId) || room.creatorId === userId,
  );
  for (const room of roomsToLeave) {
    leaveRoom(room, userId);
  }
  const roomIds = roomsToLeave.map((room) => room.id);
  return roomIds;
};

export const orderSong = (roomId: string, userId: string, song: Song) => {
  let room = getRoom(roomId);
  if (!room) throw { message: 'Room not found' };
  const user = room.findUser(userId);
  if (!user) throw { message: 'User not in room' };
  song.uniqueId = nanoid(12);
  room.addSong(song);
  room = getRoom(roomId);
  return room;
};
