import { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { app } from "./app";
import { AppError } from "./errors/AppError";
import { router } from "./infra/http/routes";

const PORT = 3333;

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: "error", message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

app.listen(PORT, () => {
  console.log(`🛸 Server started on port ${3333}`);
});
