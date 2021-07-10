import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { UpdateUserPhotoController } from "@modules/accounts/useCases/updateUserPhoto/UpdateUserPhotoController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateUserController } from "../../../useCases/createUser/CreateUserController";

const usersRouter = Router();

const uploadPhoto = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserPhotoController = new UpdateUserPhotoController();

usersRouter.post("/", createUserController.handle);

usersRouter.patch(
  "/photo",
  uploadPhoto.single("photo"),
  ensureAuthenticated,
  updateUserPhotoController.handle
);

export { usersRouter };
