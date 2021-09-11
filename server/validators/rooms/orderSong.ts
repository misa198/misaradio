import * as joi from 'joi';
import { Song } from '../../types/Song';

export const orderSongValidator = (input: { song: Song; roomId: string }) => {
  const schema = joi.object({
    roomId: joi.string().required().length(6),
    song: joi.object({
      id: joi.string().required(),
      title: joi.string().required(),
      duration: joi.number().required(),
      author: joi.string().required(),
      platform: joi.string().allow('youtube', 'soundcloud').required(),
      cover: joi.string().required(),
      orderBy: joi.string().required(),
    }),
  });
  const { error, value } = schema.validate(input);
  if (error) throw error;
  return value;
};
