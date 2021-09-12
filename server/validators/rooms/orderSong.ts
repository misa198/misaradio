import * as joi from 'joi';

export const orderSongValidator = (input: {
  roomId: string;
  type: 'youtube' | 'soundcloud';
  id: string;
}) => {
  const schema = joi.object({
    roomId: joi.string().required().length(6),
    type: joi.string().required().allow('youtube', 'soundcloud'),
    id: joi.string().required(),
  });
  const { error, value } = schema.validate(input);
  if (error) throw error;
  return value;
};
