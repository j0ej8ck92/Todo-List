import "./styles.css";
import {greeting, Task, addTaskToArray, arrOfTasks} from "./module-1.js";

console.log(greeting);


const firstTask = new Task("run", "three miles", "under 25 mins", "June 4, 2026", "medium");

const secondTask = new Task("jog", "four miles", "under 50 mins", "June 18, 2026", "high");


/*const taskButton = document.querySelector(".add-task");

console.log(taskButton);

taskButton.addEventListener("click", () => addTaskToArray());*/


console.log(firstTask);

//debugger;
console.log(firstTask.sayPriority());

addTaskToArray(firstTask);
addTaskToArray(secondTask);

console.log(arrOfTasks);

const form = document.getElementById("form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskNotes = document.getElementById("task-notes");
const taskDueDate = document.getElementById("task-due-date");
const taskPriority = document.getElementById("task-priority");
const submitButton = document.getElementById("submit");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(taskTitle.value)
    const newTask = new Task(taskTitle.value, taskDescription.value, taskNotes.value, taskDueDate.value, taskPriority.value);
    console.log(newTask);
    addTaskToArray(newTask);
   console.log(arrOfTasks);
})


const getArr = arrOfTasks[1].sayPriority(); //useful for using methods within task Array of task class objects!
                                      
console.log(getArr);

console.log(arrOfTasks[1].notes);

