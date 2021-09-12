import { Request, Response } from 'express';
import * as youtubeService from '../services/youtube';

export const searchSongs = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const result = await youtubeService.search(query as string);
    return res.send({ data: result });
  } catch (e) {
    return res.status(500).send({ error: 'Error' });
  }
};
