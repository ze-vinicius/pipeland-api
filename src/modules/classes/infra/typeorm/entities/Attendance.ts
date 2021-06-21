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

import { Class } from "./Class";
import { Student } from "./Student";

@Entity("attendances")
class Attendance {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("bool")
  is_present: boolean;

  @Column("timestamp")
  date: Date;

  @Column()
  class_id: string;

  @Column()
  student_id: string;

  @JoinColumn({ name: "class_id" })
  @ManyToOne(() => Class)
  class: Class;

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

export { Attendance };
