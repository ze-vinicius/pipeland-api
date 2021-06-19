import { isAfter } from "date-fns";

type MarioAvatar = "mario" | "superMario" | "fireMario" | "capeMario";

export const utils = {
  getTaskStatus(delivery_date: Date): "CLOSED" | "OPEN" {
    return isAfter(new Date(), delivery_date) ? "CLOSED" : "OPEN";
  },

  getStudentCurrentAvatar(coins: number): MarioAvatar {
    if (coins > 100 && coins <= 130) return "superMario";
    if (coins > 130 && coins <= 170) return "fireMario";
    if (coins >= 170) return "capeMario";

    return "mario";
  },
};
