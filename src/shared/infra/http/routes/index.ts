import { Router } from "express";

import { sessionsRouter } from "@modules/accounts/infra/http/routes/sessions.routes";
import { usersRouter } from "@modules/accounts/infra/http/routes/users.routes";
import { classesRouter } from "@modules/classes/infra/http/routes/classes.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);
router.use("/classes", classesRouter);

export { router };
