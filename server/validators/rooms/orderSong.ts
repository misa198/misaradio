import * as joi from 'joi';

export const orderSongValidator = (input: { roomId: string; id: string }) => {
  const schema = joi.object({
    roomId: joi.string().required().length(6),
    id: joi.string().required(),
  });
  const { error, value } = schema.validate(input);
  if (error) throw error;
  return value;
};
