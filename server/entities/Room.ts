import { Song } from '../types/Song';
import { User } from '../types/User';
import { io } from '../socket';

export class Room {
  id: string;
  name: string;
  users: User[] = [];
  queue: Song[] = [];
  startedTime: number = 0;
  creatorId: string;
  private playing?: Song;

  constructor(name: string, roomId: string, creatorId: string) {
    this.id = roomId;
    this.name = name;
    this.creatorId = creatorId;
    this.pingPong();
  }

  addUser(user: User) {
    this.users.push(user);
  }

  findUser(userId: string) {
    return this.users.find((u) => u.id === userId);
  }

  removeUser(userId: string) {
    this.users = this.users.filter((u) => u.id !== userId);
  }

  addSong(song: Song) {
    this.queue.push(song);
  }

  removeSong(song: Song) {
    this.queue = this.queue.filter((s) => s.id !== song.id);
  }

  getPlaying() {
    return {
      playing: this.playing,
      startAt: Date.now() - this.startedTime,
    };
  }

  private pingPong() {
    setInterval(() => {
      const playedTime = Date.now() - this.startedTime;
      if (
        this.playing &&
        playedTime > this.playing.duration &&
        this.queue.length === 0
      ) {
        this.playing = undefined;
      }
      if (
        !this.playing ||
        (playedTime > this.playing.duration && this.queue.length > 0)
      ) {
        this.playing = this.queue.shift();
        this.startedTime = Date.now();
        io.to(this.id).emit('playing', {
          playing: this.playing,
          startAt: 0,
        });
      }
    }, 2000);
  }
}
