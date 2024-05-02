import express from 'express';
import log from './utils/logger';
import connect from './utils/mongoose';
import routes from './routes';
import config from 'config';

const PORT = config.get<number>('port');

const app = express();

app.use(express.json());

app.listen(PORT, async () => {
  log.info(`Server running on port ${PORT}`);

  await connect();

  routes(app);
});
