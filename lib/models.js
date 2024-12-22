// Models

import { Status } from "./constants.js";

export function Habit(name, description, performances = []) {
  this._getStatus = function () {
    // if the first performance was at least 90 days ago
    if (
      this.performances.length &&
      new Date() - this.performances[0] > 1000 * 60 * 60 * 24 * 90
    ) {
      return Status.INGRAINED;
    }
    return Status.UNDER_ADOPTION;
  };
  this.name = name;
  this.description = description;
  this.performances = performances;
  this.status = this._getStatus();
  return this;
}

export function HabitTable() {
  this.tablename = "habits";

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

  this._parseHabitData = function (habitData) {
    return JSON.parse(habitData).map(habit => {
      const { name, description, performances } = habit;
      return new Habit(
        name,
        description,
        performances.map(performance => new Date(performance))
      );
    });
  };

  this._loadHabits = function () {
    this.habits = this._parseHabitData(
      localStorage.getItem(this.tablename) || JSON.stringify([])
    );
    return this;
  };

  this._loadHabits();
}
