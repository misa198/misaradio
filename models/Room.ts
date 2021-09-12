import { RoomUser } from './RoomUser';
import { Song } from './Song';

export interface Room {
  id: string;
  name: string;
  users: RoomUser[];
  queue: Song[];
  creatorId: string;
}
