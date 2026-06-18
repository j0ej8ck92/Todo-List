import "./styles.css";
import {greeting} from "./module-1.js";

console.log(greeting);

const arrOfTasks = [];

class Task {
    constructor(title, description, notes, dueDate, priority){
        this.title = title;
        this.description = description;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

const addTaskToArray = function(title, description, notes, dueDate, priority){
    const newTask = new Task(title, description, notes, dueDate, priority);
    console.log(arrOfTasks)
    return arrOfTasks.push(newTask);
}

const firstTask = addTaskToArray("run", "three miles", "under 25 mins", "June 4, 2026", "medium");

const secondTask = addTaskToArray("jog", "four miles", "under 50 mins", "June 18, 2026", "high");

console.log(firstTask);
console.log(secondTask);

console.log(arrOfTasks);

const taskButton = document.querySelector(".add-task");

console.log(taskButton);

taskButton.addEventListener("click", () => addTaskToArray());

