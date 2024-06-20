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
  disableServiceTypeHandler,
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

router.delete(
  "/:serviceTypeId",
  requireUser(true),
  validateResource(getServiceTypeSchema),
  disableServiceTypeHandler
);

export default router;
