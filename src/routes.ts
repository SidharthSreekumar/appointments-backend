import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/sessions.schema";
import requireUser from "./middleware/requireUser";
import { createServiceTypeHandler } from "./controller/serviceType.controller";
import { createAppointmentHandler } from "./controller/appointment.controller";
import { createServiceTypeSchema } from "./schema/serviceType.schema";
import { createAppointmentSchema } from "./schema/appointment.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  /**
   * User
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  /**
   * Session
   */
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  /**
   * Service Type
   */
  app.post(
    "/api/service-type",
    requireUser,
    validateResource(createServiceTypeSchema),
    createServiceTypeHandler
  );

  /**
   * Appointments
   */
  app.post(
    "/api/appointment",
    requireUser,
    validateResource(createAppointmentSchema),
    createAppointmentHandler
  );
}

export default routes;
