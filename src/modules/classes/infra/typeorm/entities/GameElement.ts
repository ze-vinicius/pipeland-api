import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";

@Entity("game_elements")
class GameElement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column("int")
  value: number;

  @Column()
  type: "REWARD" | "PENALTY";

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }

  imageUrl: string;

  @AfterLoad()
  setComputed(): void {
    this.imageUrl = `${process.env.BASE_URL}/files/game-assets/icons/${this.image}`;
  }
}

export { GameElement };
