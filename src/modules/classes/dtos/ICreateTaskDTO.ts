import { Class } from "../infra/typeorm/entities/Class";

interface ICreateTaskDTO {
  title: string;
  description: string;
  delivery_date: string;
  class_id?: string;
  class?: Class;
}

export { ICreateTaskDTO };
