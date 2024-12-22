// lib/views.js

export function HabitsData() {
  const { habits } = this.habits.table;

  return habits.map(habit => {
    const last = habit.performances[habit.performances.length - 1];
    return {
      status: habit.status,
      name: habit.name,
      description: habit.description,
      lastPerformance: last ? new Date(last).toDateString() : "",
      initialPerformance: habit.performances[0]
        ? new Date(habit.performances[0]).toDateString()
        : "",
      performanceCount: habit.performances.length,
    };
  });
}
