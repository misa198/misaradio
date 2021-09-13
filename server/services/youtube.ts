import axios from 'axios';
import ytsr, { Video } from 'ytsr';
import { googleAPIKey } from '../constants/config';
import { Song } from '../types/Song';
import {
  timeStringToMilliseconds,
  ytDurationToMilliseconds,
} from '../utils/time';

export const search = async (query: string) => {
  const res = await ytsr(query, { pages: 1, gl: 'VN' });
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
  const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${id}&key=${googleAPIKey}`,
  );
  const item = res.data.items[0];
  if (!item) throw { message: 'Video not found' };
  const result: Song = {
    id,
    title: item.snippet.title,
    duration: ytDurationToMilliseconds(item.lengthSeconds),
    author: item.snippet.channelTitle,
    cover: item.snippet.thumbnails.standard.url,
  };
  return result;
};
