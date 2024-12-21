// script.js

// Register Event Listeners

document.addEventListener("DOMContentLoaded", function () {
  window.habits.renderMyHabits();
});

document.addEventListener(
  "table-updated",
  window.habits.renderMyHabits.bind(window.habits)
);

document
  .querySelector("form[name='add-habit']")
  .addEventListener("submit", window.habits.handleAddHabit.bind(window.habits));

document
  .querySelector("form[name='perform-habit']")
  .addEventListener(
    "submit",
    window.habits.handlePerformHabit.bind(window.habits)
  );
