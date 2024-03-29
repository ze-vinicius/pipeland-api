import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";

import { utils } from "@shared/utils";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  nickname?: string;

  @Column()
  photo?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: "TEACHER" | "STUDENT";

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }

  @Expose({ name: "photo_url" })
  photo_url(): string | undefined {
    if (!this.photo) return undefined;

    return utils.mountImageUrl(this.photo);
  }
}
