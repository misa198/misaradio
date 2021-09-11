import { config } from 'dotenv';
config({
  path: `${__dirname}/../.env.local`,
});

import express, { Request, Response } from 'express';
import http from 'http';
import next from 'next';
import connectDb from './database/mongo';
import authRouter from './routes/auth';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
// const app = next({ dev });
// const handle = app.getRequestHandler();
const server = express();
export const httpServer = http.createServer(server);

(async () => {
  connectDb();
  require('./database/redis');
  require('./socket');
  // await app.prepare();

  server.use(express.json());
  server.use('/api/auth', authRouter);
  // server.all('*', (req: Request, res: Response) => {
  //   handle(req, res);
  // });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
