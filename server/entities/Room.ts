import { Song } from '../types/Song';
import { User } from '../types/User';
import { io } from '../socket';

export class Room {
  id: string;
  name: string;
  users: User[];
  queue: Song[];
  playing?: {
    song: Song;
    startTime: number;
  };
  creatorId: string;

  constructor(name: string, roomId: string, creatorId: string) {
    this.id = roomId;
    this.name = name;
    this.creatorId = creatorId;
    this.users = [];
    this.queue = [];
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
    if (!this.playing) {
      this.playing = {
        song,
        startTime: Date.now(),
      };
    } else {
      this.queue.push(song);
    }
  }

  removeSong(song: Song) {
    this.queue = this.queue.filter((s) => s.id !== song.id);
  }

  private pingPong() {
    setInterval(() => {
      if (this.playing) {
        const playedTime = Date.now() - this.playing.startTime;
        if (playedTime > this.playing.song.duration) {
          if (this.queue.length === 0) {
            this.playing = undefined;
          } else {
            this.playing = {
              song: this.queue[0],
              startTime: Date.now(),
            };
            this.queue.shift();
          }
        }
        if (this.playing) {
          io.to(this.id).emit('playing', {
            playing: this.playing,
            startAt: playedTime,
          });
        } else {
          io.to(this.id).emit('playing', {
            playing: undefined,
            startAt: 0,
          });
        }
      } else {
        io.to(this.id).emit('playing', {
          playing: undefined,
          startAt: 0,
        });
      }
    }, 2000);
  }
}
