import { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/AppError";

type PermittedRole = string;

function ensureAuthorizated(...permittedRoles: PermittedRole[]) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const { user } = request;

    if (user && permittedRoles.includes(user.role)) {
      next();
    } else {
      throw new AppError("Usuário não autorizado", 403);
    }
  };
}

export { ensureAuthorizated };
