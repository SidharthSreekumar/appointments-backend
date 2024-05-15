import log from './utils/logger';
import connect from './utils/mongoose';
import config from 'config';
import createServer from './utils/server';


const PORT = config.get<number>('port');

const app = createServer();

app.listen(PORT, async () => {
  log.info(`Server running on port ${PORT}`);

  await connect();
});
