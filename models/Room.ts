import { RoomUser } from './RoomUser';
import { Song } from './Song';

export interface Room {
  id: string;
  name: string;
  users: RoomUser[];
  queue: Song[];
  playing?: {
    song: Song;
    startTime: number;
  };
  creatorId: string;
}
