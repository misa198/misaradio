import { SoundCloud, Track } from 'scdl-core';
import { Song } from '../types/Song';

const scdl = new SoundCloud();

scdl.connect().then(() => console.log('Connected to Soundcloud'));

export const search = async (query: string, user: string) => {
  const res = await scdl.search({
    query,
    filter: 'tracks',
  });
  const songs = res.collection;
  const result: Song[] = [];
  for (let i = 0; i < 10; i++) {
    if (i <= songs.length) {
      if (songs[i]) {
        const song = songs[i] as Track;
        result.push({
          id: song.id.toString(),
          title: song.title,
          author: song.user.username,
          platform: 'soundcloud',
          cover: song.artwork_url || '',
          duration: song.duration,
          orderBy: user,
        });
      }
    } else break;
  }
  return result;
};
