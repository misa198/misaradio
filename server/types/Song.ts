export interface Song {
  id: string;
  title: string;
  duration: number;
  author: string;
  platform: 'youtube' | 'soundcloud';
  cover: string;
  orderBy: string;
}
