import { Song } from './Song';
import { User } from './User';

export interface Room {
  name: string;
  users: User[];
  queue: Song[];
  playing?: {
    song: Song;
    startTime: number;
  };
  creatorId: string;
}
