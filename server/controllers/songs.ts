import { Request, Response } from 'express';
import * as youtubeService from '../services/youtube';
import { UserRequest } from '../types/UserRequest';

export const searchSongs = async (req: Request, res: Response) => {
  const user = (req as UserRequest).user;
  const { type, query } = req.query;
  const result = await youtubeService.search(query as string, user.name);
  return res.send({ data: result });
};
