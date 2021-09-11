import * as joi from 'joi';

export const joinRoomValidator = (input: { roomId: string }) => {
  const schema = joi.object({
    roomId: joi.string().required().length(6),
  });
  const { error, value } = schema.validate(input);
  if (error) throw error;
  return value;
};
