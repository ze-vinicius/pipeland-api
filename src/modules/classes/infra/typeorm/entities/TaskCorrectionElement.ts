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
import { TaskCorrection } from "./TaskCorrection";

@Entity("tasks_corrections_elements")
class TaskCorrectionElement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  task_correction_id: string;

  @Column("uuid")
  game_element_id: string;

  @JoinColumn({ name: "task_correction_id" })
  @ManyToOne(() => TaskCorrection)
  task_correction: TaskCorrection;

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

export { TaskCorrectionElement };
