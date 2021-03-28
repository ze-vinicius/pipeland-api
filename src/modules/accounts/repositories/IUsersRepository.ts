import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;

  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;
}
