import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

async function connect() {
  const connectionURI = config.get<string>('dbUri')

  try {
    await mongoose.connect(connectionURI);
    log.info('Database connected successfully');
  } catch (error) {
    log.error('Database connection failed');
    log.error(error);
    process.exit(1);
  }
}

export default connect;
