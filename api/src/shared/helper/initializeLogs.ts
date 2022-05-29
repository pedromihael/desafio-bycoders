import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import * as express from 'express'

export const initializeLogs = (app: express.Application): void => {
  const logsFile = fs.createWriteStream(path.join(__dirname, '..', 'log', 'requests.log'), { flags: 'a' });
  morgan.token('body', (req: express.Request, res: express.Response) => JSON.stringify(req.body));
  app.use(
    morgan(':remote-addr - :method :url :status :response-time ms - :res[content-length] :body', {
      stream: logsFile,
    }),
  );
}