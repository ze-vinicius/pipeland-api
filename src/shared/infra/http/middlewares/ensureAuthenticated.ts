import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não encontrado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.secretKey) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    request.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
}

export { ensureAuthenticated };
