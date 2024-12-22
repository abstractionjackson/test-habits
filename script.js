// script.js

if (!window.habits) {
  throw new Error("Missing habits module");
}

// UI Elements
const addHabitForm = document.querySelector("form[name='add-habit']");
const habitsTable = document.querySelector("table[name='my-habits']");
const openAddHabitDialogButton = document.querySelector(
  "button[name='open-add-habit-dialog']"
);
const closeAddHabitDialogButton = document.querySelector(
  "button[name='close-add-habit-dialog']"
);
const addHabitDialog = document.querySelector(
  "dialog[name='add-habit-dialog']"
);

// Icons
const statusIcons = {
  [habits.constants.Status.UNDER_ADOPTION]: "🚼",
  [habits.constants.Status.INGRAINED]: "🌱",
};

// Handlers
function renderHabitsTable() {
  const habitsData = habits.views.HabitsData();

  const tbody = habitsTable.querySelector("tbody");

  tbody.innerHTML = "";

  habitsData.forEach(habit => {
    const row = document.createElement("tr");

    const status = document.createElement("td");
    status.textContent = statusIcons[habit.status];
    const name = document.createElement("td");
    name.textContent = habit.name;
    const description = document.createElement("td");
    description.textContent = habit.description;
    const lastPerformance = document.createElement("td");
    lastPerformance.textContent = habit.lastPerformance;
    const initialPerformance = document.createElement("td");
    initialPerformance.textContent = habit.initialPerformance;
    const performanceCount = document.createElement("td");
    performanceCount.textContent = habit.performanceCount;
    const performButton = document.createElement("button");
    performButton.textContent = "Perform";
    performButton.addEventListener("click", e => {
      handlePerformHabit(habit.name);
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", e => {
      habits.table.delete(habit.name);
      document.dispatchEvent(new CustomEvent("table-updated"));
    });

    row.appendChild(status);
    row.appendChild(name);
    row.appendChild(description);
    row.appendChild(lastPerformance);
    row.appendChild(initialPerformance);
    row.appendChild(performanceCount);
    row.appendChild(performButton);
    row.appendChild(deleteButton);

    tbody.appendChild(row);
  });
}
function handlePerformHabit(habitName) {
  habits.table.perform(habitName);

  document.dispatchEvent(new CustomEvent("table-updated"));
}
function handleToggleShowAddHabitDialog() {
  addHabitDialog.showModal();
}

// Register Event Listeners

document.addEventListener("DOMContentLoaded", function () {
  renderHabitsTable();
});

document.addEventListener("table-updated", function () {
  renderHabitsTable();
});

addHabitForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(addHabitForm);
  const habitData = Object.fromEntries(formData.entries());
  const { name, description } = habitData;

  habits.table.add(name, description);

  document.dispatchEvent(new CustomEvent("table-updated"));
  addHabitDialog.close();
});

openAddHabitDialogButton.addEventListener("click", function () {
  addHabitDialog.showModal();
});

closeAddHabitDialogButton.addEventListener("click", function () {
  addHabitDialog.close();
});
