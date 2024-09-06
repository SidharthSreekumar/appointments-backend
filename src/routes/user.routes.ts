import express from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema, editUserSchema } from "../schema/user.schema";
import {
  createUserHandler,
  editUserHandler,
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
const router = express.Router();

// /api/users

// Create User
router.post("/", validateResource(createUserSchema), createUserHandler);

// Edit user
router.patch(
  "/edit/:userId",
  requireUser(),
  validateResource(editUserSchema),
  editUserHandler
);

export default router;
