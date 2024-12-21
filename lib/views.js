// lib/views.js

function renderPerformHabitForm() {
  // render options to the select element name="habit" in form name="perform-habit"
  const select = document.querySelector("select[name='habit']");
  select.innerHTML = "";
  this.table.habits.forEach(habit => {
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
  this.table.habits.forEach(habit => {
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
    deleteButton.addEventListener("click", this.handleDeleteHabit.bind(this));
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

export function renderMyHabits() {
  renderHabitsTable.call(this);
  renderPerformHabitForm.call(this);
}
