import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAuthorizated } from "@shared/infra/http/middlewares/ensureAuthorizated";

import { CreateClassController } from "../../../useCases/createClass/CreateClassController";

const classesRouter = Router();

const createClassController = new CreateClassController();

classesRouter.post(
  "/",
  ensureAuthenticated,
  ensureAuthorizated("TEACHER"),
  createClassController.handle
);

export { classesRouter };
