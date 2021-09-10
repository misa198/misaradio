import redis from 'redis';
const asyncRedis = require('async-redis');

const host = process.env.REDIS_HOST || 'localhost';
const port = parseInt(process.env.REDIS_PORT || '6379', 10);

const client = redis.createClient({ host, port });
const asyncClient = asyncRedis.decorate(client);

export default asyncClient;
