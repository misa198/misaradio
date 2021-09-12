import ytsr, { Video } from 'ytsr';
import ytdl from 'ytdl-core';
import { Song } from '../types/Song';
import { timeStringToMilliseconds } from '../utils/time';

export const search = async (query: string) => {
  const res = await ytsr(query, { pages: 1 });
  const videos = res.items.filter((e) => e.type === 'video') as Video[];
  const result: Song[] = [];
  for (let i = 0; i < 10; i++) {
    if (i <= videos.length) {
      if (videos[i]) {
        result.push({
          id: videos[i].id,
          title: videos[i].title,
          author: videos[i].author?.name || '',
          cover: videos[i].bestThumbnail.url || '',
          duration: timeStringToMilliseconds(videos[0].duration || '0'),
        });
      }
    } else break;
  }
  return result;
};

export const getVideoById = async (id: string) => {
  const res = await ytdl.getInfo(id);
  if (!res) throw { message: 'Video not found' };
  const result: Song = {
    id,
    title: res.videoDetails.title,
    duration: parseInt(res.videoDetails.lengthSeconds) * 1000,
    author: res.videoDetails.author.name,
    cover: res.thumbnail_url,
  };
  return result;
};
