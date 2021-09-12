import { Request, Response } from 'express';
import * as youtubeService from '../services/youtube';
import * as soundcloudService from '../services/soundcloud';
import { Song } from '../types/Song';
import { UserRequest } from '../types/UserRequest';

export const searchSongs = async (req: Request, res: Response) => {
  try {
    const user = (req as UserRequest).user;
    const { type, query } = req.query;
    let result: Song[] = [];
    switch (type) {
      case 'youtube':
        result = await youtubeService.search(query as string);
        break;
      case 'soundcloud':
        result = await soundcloudService.search(query as string);
        break;
      default:
        break;
    }
    return res.send({ data: result });
  } catch (e) {
    return res.status(500).send({ error: 'Error' });
  }
};
