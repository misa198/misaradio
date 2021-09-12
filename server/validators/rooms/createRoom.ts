import * as joi from 'joi';

export const createRoomValidator = (input: { name: string }) => {
  const schema = joi.object({
    name: joi.string().required().max(15),
  });
  const { error, value } = schema.validate(input);
  if (error) throw error;
  return value;
};
