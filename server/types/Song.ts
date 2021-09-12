export interface Song {
  id: string;
  title: string;
  duration: number;
  author: string;
  cover: string;
  orderBy?: string;
  uniqueId?: string;
}
