import { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/AppError";
import { RESPONSE_ERRORS } from "@shared/utils";

type PermittedRole = "TEACHER" | "STUDENT";

function ensureAuthorizated(...permittedRoles: PermittedRole[]) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const { user } = request;

    if (user && permittedRoles.includes(user.role as PermittedRole)) {
      next();
    } else {
      throw new AppError(RESPONSE_ERRORS.NOT_AUTHORIZED, 403);
    }
  };
}

export { ensureAuthorizated };
