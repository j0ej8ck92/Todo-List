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


export const addTaskToArray = function(task){
    const addTaskToArray = arrOfTasks.push(task);
    return addTaskToArray;
}

export const arrOfTasks = [];

const taskDisplay = document.getElementById("display-task");


export const createTaskDisplay = function(task){
    const taskDisplayContainer = document.createElement("div");
    taskDisplayContainer.classList.add("task-display-container");
    //taskDisplayContainer.id = task.id;
    taskDisplayContainer.dataset.projectId = task.projectId;
    taskDisplayContainer.hidden = task.projectId !== activeProjectId;
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
}


