import log from "./utils/logger.util";
import connect from "./utils/mongoose.util";
import createServer from "./utils/server.util";

const PORT = process.env.PORT || 1337;

const app = createServer();

app.listen(PORT, async () => {
  log.info(`Server running on port ${PORT}`);

  await connect();
});
