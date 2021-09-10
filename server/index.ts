import { config } from 'dotenv';
config({
  path: `${__dirname}/../.env.local`,
});

import express, { Request, Response } from 'express';
import next from 'next';
import connectDb from './database';
import authRouter from './routes/auth';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

(async () => {
  connectDb();
  await app.prepare();

  server.use(express.json());
  server.use('/api/auth', authRouter);
  server.all('*', (req: Request, res: Response) => {
    handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
