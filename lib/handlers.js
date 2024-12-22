// Event Handlers
export function handleAddHabit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get("name");
  const description = formData.get("description");

  try {
    this.table.add(name, description);
  } catch (e) {
    alert(e);
  }

  form.reset();

  document.dispatchEvent(new CustomEvent("table-updated"));
}

export function handlePerformHabit(event) {
  // Form Submission Handler
  // Get "habit" from the form
  event.preventDefault();
  const form = event.target;
  const habit = form.querySelector("select[name='habit']").value;
  // Perform the habit
  this.table.perform(habit);
  // Emit a custom event to notify the table has been updated
  document.dispatchEvent(new CustomEvent("table-updated"));
  // Clear the form
  form.reset();
}

export function handleDeleteHabit(event) {
  // Button Click Handler
  // Get the habit name from the button
  const habit = event.target.dataset.habit;
  // Delete the habit
  this.table.delete(habit);
  // Emit a custom event to notify the table has been updated
  document.dispatchEvent(new CustomEvent("table-updated"));
}
