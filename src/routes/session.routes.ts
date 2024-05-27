import express from "express";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/sessions.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";
import requireUser from "../middleware/requireUser";
const router = express.Router();

// Session routes
// /api/sessions
router
  .route("/")
  // Create session
  .post(validateResource(createSessionSchema), createUserSessionHandler)
  // Get current user active sessions
  .get(requireUser, getUserSessionsHandler)
  // Delete session or logout
  .delete(requireUser, deleteSessionHandler);

export default router;
