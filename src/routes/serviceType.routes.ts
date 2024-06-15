import express from "express";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createServiceTypeSchema,
  getServiceTypeSchema,
  updateServiceTypeSchema,
} from "../schema/serviceType.schema";
import {
  createServiceTypeHandler,
  getAllActiveServiceTypesHandler,
  getServiceTypeHandler,
  updateServiceTypeHandler,
} from "../controller/serviceType.controller";
const router = express.Router();

router
  .route("/")
  .post(
    requireUser(),
    validateResource(createServiceTypeSchema),
    createServiceTypeHandler
  )
  .get(getAllActiveServiceTypesHandler);

router.get(
  "/:serviceTypeId",
  validateResource(getServiceTypeSchema),
  getServiceTypeHandler
);

router.patch(
  "/:serviceTypeId",
  requireUser(true),
  validateResource(updateServiceTypeSchema),
  updateServiceTypeHandler
);

export default router;
