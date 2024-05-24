import log from './utils/logger.util';
import connect from './utils/mongoose.util';
import config from 'config';
import createServer from './utils/server.util';


const PORT = config.get<number>('port');

const app = createServer();

app.listen(PORT, async () => {
  log.info(`Server running on port ${PORT}`);

  await connect();
});
