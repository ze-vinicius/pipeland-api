import { Class } from "../infra/typeorm/entities/Class";

interface ICreateTaskDTO {
  title: string;
  description: string;
  start_date?: Date;
  delivery_date: Date;
  class_id?: string;
  class?: Class;
}

export { ICreateTaskDTO };
