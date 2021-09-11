import { Request, Response } from 'express';
import * as youtubeService from '../services/youtube';
import * as soundcloudService from '../services/soundcloud';
import { Song } from '../types/Song';
import { UserRequest } from '../types/UserRequest';

export const searchSongs = async (req: Request, res: Response) => {
  const user = (req as UserRequest).user;
  const { type, query } = req.query;
  let result: Song[] = [];
  switch (type) {
    case 'youtube':
      result = await youtubeService.search(query as string, user.name);
      break;
    case 'soundcloud':
      result = await soundcloudService.search(query as string, user.name);
      break;
    default:
      break;
  }
  return res.send({ data: result });
};
