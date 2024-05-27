import express from "express";
import deserializeUser from "../middleware/deserializeUser";
import routes from "../routes/app.routes";
import userRoutes from "../routes/user.routes";
import sessionRoutes from "../routes/session.routes";
import serviceTypeRoutes from "../routes/serviceType.routes";

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(deserializeUser);

  app.use("/api/users", userRoutes);
  app.use("/api/sessions", sessionRoutes);
  app.use("/api/service-type", serviceTypeRoutes);

  routes(app);

  return app;
}

export default createServer;
