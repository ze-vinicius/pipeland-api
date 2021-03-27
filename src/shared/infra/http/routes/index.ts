import { Router } from "express";

import { sessionsRouter } from "../../../../modules/accounts/infra/http/routes/sessions.routes";
import { usersRouter } from "../../../../modules/accounts/infra/http/routes/users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);

export { router };
