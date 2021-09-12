import ytsr, { Video } from 'ytsr';
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
          platform: 'youtube',
          cover: videos[i].bestThumbnail.url || '',
          duration: timeStringToMilliseconds(videos[0].duration || '0'),
        });
      }
    } else break;
  }
  return result;
};
