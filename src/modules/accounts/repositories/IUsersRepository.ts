import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;

  findById(id: string): Promise<User>;

  findByEmail(email: string): Promise<User>;
}
