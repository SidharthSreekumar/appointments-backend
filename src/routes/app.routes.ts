import { Express, Request, Response } from "express";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  /**
   * Appointments
   */
  app.post;
}

export default routes;
