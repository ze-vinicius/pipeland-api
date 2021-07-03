import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";

import { Class } from "./Class";
import { TaskElement } from "./TaskElement";

@Entity("tasks")
class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("timestamp")
  delivery_date: Date;

  @Column("timestamp")
  start_date: Date;

  @Column()
  class_id: string;

  @JoinColumn({ name: "class_id" })
  @ManyToOne(() => Class)
  class: Class;

  @OneToMany(() => TaskElement, (task_element) => task_element.task)
  task_elements: TaskElement[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}

export { Task };
