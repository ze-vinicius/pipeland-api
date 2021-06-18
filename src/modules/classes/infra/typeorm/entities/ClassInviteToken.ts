import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";

import { Class } from "./Class";

@Entity("classes_invite_tokens")
class ClassInviteToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Generated("uuid")
  token: string;

  @Column()
  class_id: string;

  @JoinColumn({ name: "class_id" })
  @ManyToOne(() => Class)
  class: Class;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }

    if (!this.token) {
      this.token = v4();
    }
  }
}

export { ClassInviteToken };
