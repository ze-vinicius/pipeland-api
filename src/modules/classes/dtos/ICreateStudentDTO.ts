import { Class } from "../infra/typeorm/entities/Class";

interface ICreateStudentDTO {
  user_id: string;
  nickname?: string;
  photo?: string;
  class_id?: string;
  class?: Class;
}

export { ICreateStudentDTO };
