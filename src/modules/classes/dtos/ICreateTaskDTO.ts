interface ICreateTaskDTO {
  title: string;
  description: string;
  delivery_date: string;
  class_id?: string;
  class?: string;
}

export { ICreateTaskDTO };
