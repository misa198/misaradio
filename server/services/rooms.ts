import { nanoid } from 'nanoid';
import { roomCodeLength } from '../constants/config';
import {
  getObject,
  getString,
  removeKey,
  setObject,
  setString,
} from '../services/redis';
import { Room } from '../types/Room';
import { Song } from '../types/Song';
import { User } from '../types/User';

export const getRoom = async (roomId: string) => {
  const room = await getObject(roomId);
  return room as Room;
};

export const createRoom = async (name: string, user: User) => {
  const roomId = nanoid(roomCodeLength);
  const foundRoom = await getRoom(roomId);
  if (foundRoom) {
    createRoom(name, user);
  } else {
    let createdRooms = await getObject(`${user.id}_created`);
    createdRooms = createdRooms ? (createdRooms as Room[]) : [];
    createdRooms.push(roomId);
    await Promise.all([
      setObject(roomId, {
        name,
        users: [],
        queue: [],
        creatorId: user.id,
      }),
      setObject(`${user.id}_created`, createdRooms),
    ]);
    return roomId;
  }
};

export const joinRoom = async (roomId: string, user: User) => {
  const room = await getRoom(roomId);
  room.users.push(user);
  let joinedRooms = await getObject(`${user.id}_joined`);
  joinedRooms = joinedRooms ? (joinedRooms as Room[]) : [];
  joinedRooms.push(roomId);
  await Promise.all([
    setString(`${user.id}_joined`, joinedRooms),
    setObject(roomId, room),
  ]);
  return room;
};

const leaveRoom = async (roomId: string, userId: string) => {
  const room = (await getRoom(roomId)) as Room;
  room.users = room.users.filter((user) => user.id !== userId);
  if (room.users.length > 0) {
    await setObject(roomId, room);
  }
  await removeKey(`${userId}_joined`);
};

export const leaveRooms = async (userId: string) => {
  let [createdRooms, joinedRooms] = await Promise.all([
    getObject(`${userId}_created`),
    getObject(`${userId}_joined`),
  ]);
  createdRooms = createdRooms ? (createdRooms as string[]) : [];
  joinedRooms = joinedRooms ? (joinedRooms as string[]) : [];
  const rooms = [...createdRooms, ...joinedRooms] as string[];
  rooms.forEach((room) => {
    leaveRoom(room, userId);
  });
};

export const orderSong = async (roomId: string, userId: string, song: Song) => {
  const room = (await getRoom(roomId)) as Room;
  if (!room) throw { message: 'Room not found' };
  const user = room.users.find((user) => user.id === userId);
  if (!user) throw { message: 'Not allowed' };
  if (room.queue.length === 0) {
    room.playing = {
      song,
      startTime: Date.now(),
    };
  } else {
    room.queue.push(song);
  }
  await setObject(roomId, room);
  return room;
};
