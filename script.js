// Models
function Habit(name, description, performances = []) {
  this.name = name;
  this.description = description;
  this.performances = performances;
  return this;
}

function HabitTable() {
  this.tablename = "habits";
  this.data = localStorage.getItem("habits") || JSON.stringify([]);
  this.habits = JSON.parse(this.data).map(
    obj => new Habit(obj["name"], obj["description"], obj["performances"])
  );
  this.save = function () {
    localStorage.setItem(this.tablename, JSON.stringify(this.habits));
  };
  this.add = function (name, description) {
    if (this.habits.some(habit => habit.name === name)) {
      throw new Error(`Habit ${name} exists`);
    }
    this.habits.push(new Habit(name, description));
    this.save();
  };
  this.find = function (name) {
    return this.habits.find(habit => habit.name === name);
  };
  this.perform = function (name) {
    this.find(name).performances.push(new Date());
    this.save();
  };
  this.delete = function (name) {
    this.habits.splice(
      this.habits.findIndex(habit => habit.name === name),
      1
    );
    this.save();
  };
  return this;
}

// Make available to Mizu
window.table = new HabitTable();

// Views
function renderPerformHabitForm() {
  // render options to the select element name="habit" in form name="perform-habit"
  const select = document.querySelector("select[name='habit']");
  select.innerHTML = "";
  window.table.habits.forEach(habit => {
    const option = document.createElement("option");
    option.textContent = habit.name;
    select.appendChild(option);
  });
}
function renderHabitsTable() {
  //table has name my-habits
  const table = document.querySelector("table[name='my-habits']");
  // get table body
  const tbody = table.querySelector("tbody");
  // clear the table body
  tbody.innerHTML = "";
  // iterate over the habits
  window.table.habits.forEach(habit => {
    // create a row
    const row = document.createElement("tr");
    // create a cell for the name
    const name = document.createElement("td");
    name.textContent = habit.name;
    // create a cell for the description
    const description = document.createElement("td");
    description.textContent = habit.description;
    // get the most recent performance
    const last = habit.performances[habit.performances.length - 1];
    // create a cell for the last performance
    const lastPerformance = document.createElement("td");
    lastPerformance.textContent = last ? new Date(last).toDateString() : "";
    // create a cell for the initial performance
    const initialPerformance = document.createElement("td");
    // the initial performance is the at the zeroth index
    initialPerformance.textContent = habit.performances[0]
      ? new Date(habit.performances[0]).toDateString()
      : "";
    // get a count of the performances
    const count = habit.performances.length;
    // create a cell for the count of performances
    const performanceCount = document.createElement("td");
    performanceCount.textContent = count;
    // create a "delete" button that has a data attribute of the habit name
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.habit = habit.name;
    deleteButton.addEventListener("click", handleDeleteHabit);
    // append the cells to the row
    row.appendChild(name);
    row.appendChild(description);
    row.appendChild(lastPerformance);
    row.appendChild(initialPerformance);
    row.appendChild(performanceCount);
    row.appendChild(deleteButton);

    // append the row to the table body
    tbody.appendChild(row);
    // close the loop
  });
}
function renderMyHabits() {
  renderHabitsTable();
  renderPerformHabitForm();
}

// Event Handlers
function handleAddHabit(event) {
  // Form Submission Handler
  // Get "name" and "description" from the form
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector("input[name='name']").value;
  const description = form.querySelector("input[name='description']").value;
  // Add the habit to the table
  try {
    table.add(name, description);
  } catch (e) {
    alert(e);
  }
  // Emit a custom event to notify the table has been updated
  document.dispatchEvent(new CustomEvent("table-updated"));
  // Clear the form
  form.reset();
}

function handlePerformHabit(event) {
  // Form Submission Handler
  // Get "habit" from the form
  event.preventDefault();
  const form = event.target;
  const habit = form.querySelector("select[name='habit']").value;
  // Perform the habit
  table.perform(habit);
  // Emit a custom event to notify the table has been updated
  document.dispatchEvent(new CustomEvent("table-updated"));
  // Clear the form
  form.reset();
}

function handleDeleteHabit(event) {
  // Button Click Handler
  // Get the habit name from the button
  const habit = event.target.dataset.habit;
  // Delete the habit
  table.delete(habit);
  // Emit a custom event to notify the table has been updated
  document.dispatchEvent(new CustomEvent("table-updated"));
}

// Event Listeners

document.addEventListener("DOMContentLoaded", renderMyHabits);

document.addEventListener("table-updated", renderMyHabits);

document
  .querySelector("form[name='add-habit']")
  .addEventListener("submit", handleAddHabit);

document
  .querySelector("form[name='perform-habit']")
  .addEventListener("submit", handlePerformHabit);

// Tests

// const table = new HabitTable();

// try {
//   table.add("foo", "foobar");
//   table.add("foo", "foobar");
// } catch (e) {
//   console.error(e);
// }
// table.add("bar", "barbaz");
// const bar = table.find("bar");
// table.perform("bar");
// table.delete("foo");
// console.log(table.habits);

// // Clean-up
// localStorage.removeItem("habits");
