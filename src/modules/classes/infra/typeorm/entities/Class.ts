import { v4 } from "uuid";

class Class {
  id: string;

  name: string;

  active: boolean;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}

export { Class };
