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

import { Student } from "./Student";
import { Task } from "./Task";

@Entity("tasks_corrections")
class TaskCorrection {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  earned_coins: number;

  @Column("text")
  comment: string;

  @Column()
  task_id: string;

  @Column()
  student_id: string;

  @JoinColumn({ name: "task_id" })
  @ManyToOne(() => Task)
  task: Task;

  @JoinColumn({ name: "student_id" })
  @ManyToOne(() => Student)
  student: Student;

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

export { TaskCorrection };
