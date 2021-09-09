import { config } from 'dotenv';
config();

import express, { Request, Response } from 'express';
import next from 'next';
import passport from 'passport';
import connectDb from './database';
import authRoute from './routes/auth';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

(async () => {
  connectDb();
  await app.prepare();

  server.use(passport.initialize());

  server.use('/api/auth', authRoute);
  server.use((req: Request, res: Response) => {
    handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
