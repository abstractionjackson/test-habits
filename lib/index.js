// lib/index.js

import { HabitTable } from "./models.js";
import { HabitsData } from "./views.js";
import {
  handleAddHabit,
  handleDeleteHabit,
  handlePerformHabit,
} from "./handlers.js";
import { Status } from "./constants.js";

if (!window) {
  throw new Error("Missing window object");
}

window.habits = {
  table: new HabitTable(),
  views: {
    HabitsData: HabitsData.bind(window),
  },
  constants: {
    Status,
  },
};
