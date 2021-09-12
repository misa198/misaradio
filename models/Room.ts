import { RoomUser } from './RoomUser';
import { Song } from './Song';

export interface Playing {
  song: Song;
  startTime: number;
}

export interface Room {
  id: string;
  name: string;
  users: RoomUser[];
  queue: Song[];
  playing?: Playing;
  creatorId: string;
}
