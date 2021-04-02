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

import { User } from "@modules/accounts/infra/typeorm/entities/User";

@Entity("classes")
class Class {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("bool")
  active: boolean;

  @Column()
  teacher_id: string;

  @JoinColumn({ name: "teacher_id" })
  @ManyToOne(() => User)
  teacher: User;

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

export { Class };
