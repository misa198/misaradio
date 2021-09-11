import { config } from 'dotenv';
config({
  path: `${__dirname}/../.env.local`,
});

import express, { Request, Response } from 'express';
import http from 'http';
import next from 'next';
import connectDb from './database/mongo';
import authRouter from './routes/auth';
import songRouter from './routes/songs';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();
export const httpServer = http.createServer(server);

(async () => {
  connectDb();
  require('./socket');
  await app.prepare();

  server.use(express.json());
  server.use('/api/auth', authRouter);
  server.use('/api/songs', songRouter);

  server.all('*', (req: Request, res: Response) => handler(req, res));

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
