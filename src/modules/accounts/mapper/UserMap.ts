import { classToClass } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    name,
    nickname,
    email,
    role,
    photo,
    photo_url,
  }: User): IUserResponseDTO {
    const formatedUser = classToClass({
      id,
      name,
      nickname,
      email,
      role,
      photo,
      photo_url,
    });

    return formatedUser;
  }
}

export { UserMap };
