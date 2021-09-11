import client from '../database/redis';

export const getObject = async (key: string) => {
  const value = await client.get(key);
  const parsedValue = value ? JSON.parse(value) : null;
  return parsedValue;
};

export const setObject = async (key: string, value: any) => {
  return client.set(key, JSON.stringify(value));
};

export const getString = async (key: string) => {
  return client.get(key);
};

export const setString = async (key: string, value: string) => {
  return client.set(key, value);
};

export const removeKey = async (key: string) => {
  return client.del(key);
};