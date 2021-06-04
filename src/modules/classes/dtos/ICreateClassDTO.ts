import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface ICreateClassDTO {
  name: string;
  teacher_id?: string;
  teacher?: User;
}

export { ICreateClassDTO };
