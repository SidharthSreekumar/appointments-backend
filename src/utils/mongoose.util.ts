import mongoose from "mongoose";
import log from "./logger.util";

async function connect() {
  const connectionURI = process.env.DBURI ?? "";

  try {
    await mongoose.connect(connectionURI);
    log.info("Database connected successfully");
  } catch (error) {
    log.error("Database connection failed");
    log.error(error);
    process.exit(1);
  }
}

export default connect;
