import { activeProjectId } from "./project-module.js";

export const greeting = "Hello Odinite!";



export class Task {
    constructor(title, description, notes, dueDate, priority, id){
        this.title = title;
        this.description = description;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id;
    }
}

//const taskMethodPriority = {

    Task.prototype.sayPriority = function(){
        const saying = `This title has a priority of ${this.priority}.`
        return saying;
    }
//}

//Object.assign(Task.prototype, taskMethodPriority); 

export const arrOfTasks = [];

export const addTaskToArray = function(task){
    const addTaskToArray = arrOfTasks.push(task);
    return addTaskToArray;
}

const taskDisplay = document.getElementById("display-task");


export const createTaskDisplay = function(task){ //passes in new Task object
    const taskDisplayContainer = document.createElement("div");
    taskDisplayContainer.classList.add("task-display-container");
    taskDisplayContainer.id = task.id;
    taskDisplayContainer.dataset.projectId = task.projectId;
    taskDisplayContainer.hidden = task.projectId !== activeProjectId; // hides the Task container if data-project-id is not equal to the active Project clicked on
    taskDisplay.append(taskDisplayContainer);

    const taskTitleDisplay = document.createElement("div");
    taskTitleDisplay.classList.add("title-value");
    taskDisplayContainer.append(taskTitleDisplay);
    taskTitleDisplay.textContent = task.title;

    const taskDescriptionDisplay = document.createElement("div");
    taskDescriptionDisplay.classList.add("description-value");
    taskDisplayContainer.append(taskDescriptionDisplay);
    taskDescriptionDisplay.textContent = task.description;

    const taskNotesDisplay = document.createElement("div");
    taskNotesDisplay.classList.add("notes-value");
    taskDisplayContainer.append(taskNotesDisplay);
    taskNotesDisplay.textContent = task.notes;

    const taskDueDateDisplay = document.createElement("div");
    taskDueDateDisplay.classList.add("due-date-value");
    taskDisplayContainer.append(taskDueDateDisplay);
    taskDueDateDisplay.textContent = task.dueDate;

    const taskPriorityDisplay = document.createElement("div");
    taskPriorityDisplay.classList.add("priority-value");
    taskDisplayContainer.append(taskPriorityDisplay);
    taskPriorityDisplay.textContent = task.priority;

    const taskDeleteButtonDiv = document.createElement("div");
    taskDeleteButtonDiv.classList.add("delete-button-div");
    taskDisplayContainer.append(taskDeleteButtonDiv);

    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.id = "delete-task-button";
    taskDeleteButtonDiv.append(taskDeleteButton);
    taskDeleteButton.textContent = "DELETE";

    taskDeleteButton.addEventListener("click", (event) => {

       // if (!confirm("Are you sure you want to delete this task?")){

           // return;
       // }

        const taskObject = arrOfTasks.findIndex((index) => index.id === task.projectId);
        arrOfTasks.splice(taskObject, 1);
        taskDisplayContainer.remove();
        console.log(arrOfTasks);
    })
}


