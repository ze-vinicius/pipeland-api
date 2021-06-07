import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";

import { GameElement } from "./GameElement";
import { Task } from "./Task";

@Entity("tasks_elements")
class TaskElement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  quantity: number;

  @Column()
  task_id: string;

  @Column()
  game_element_id: string;

  @JoinColumn({ name: "task_id" })
  @ManyToOne(() => Task)
  task: Task;

  @JoinColumn({ name: "game_element_id" })
  @ManyToOne(() => GameElement)
  game_element: GameElement;

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

export { TaskElement };
