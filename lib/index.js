// lib/index.js

import { HabitTable } from "./models.js";
import { renderMyHabits } from "./views.js";
import {
  handleAddHabit,
  handleDeleteHabit,
  handlePerformHabit,
} from "./handlers.js";

window.habits = {
  table: new HabitTable(),
  renderMyHabits,
  handleDeleteHabit,
  handleAddHabit,
  handlePerformHabit,
};
