import "./styles.css";
import {greeting, Task, addTaskToArray, arrOfTasks} from "./task-module.js";

console.log(greeting);

const firstTask = new Task("run", "three miles", "under 25 mins", "June 4, 2026", "medium");
const secondTask = new Task("jog", "four miles", "under 50 mins", "June 18, 2026", "high");
const thirdTask = new Task("walk", "ten miles", "under 6 hours", "July 10, 2026", "mild");


console.log(firstTask);

console.log(firstTask.sayPriority());

addTaskToArray(firstTask);
addTaskToArray(secondTask);
addTaskToArray(thirdTask);

console.log(arrOfTasks);

const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskNotes = document.getElementById("task-notes");
const taskDueDate = document.getElementById("task-due-date");
const taskPriority = document.getElementById("task-priority");
const taskSubmitButton = document.getElementById("task-submit");

const getArr = arrOfTasks[1].sayPriority(); //useful for using methods within task Array of task class objects!
                                      
console.log(getArr);

console.log(arrOfTasks[1].notes);

const arrOfProjects = [];

class Project {
    constructor(project, arrOfProjectTasks = []){
        this.project = project;
        this.projectTasks = [...arrOfProjectTasks];
        this.id = crypto.randomUUID();
    }

    addTasks(tasks){
        this.projectTasks.push(tasks);
    }
}

Project.prototype.displayProject = function(){
    const projectStringValue = this.project;
    return projectStringValue
}

const projectOne = new Project("Coding");

arrOfProjects.push(projectOne);
projectOne.addTasks(firstTask);
projectOne.addTasks(secondTask);

console.log(arrOfProjects);
console.log(projectOne);

const projectForm = document.getElementById("project-form");
const projectTitle = document.getElementById("project-title");
const projectSubmitButton = document.getElementById("project-submit");

const projectDisplay = document.getElementById("display-project");
const taskDisplay = document.getElementById("display-task");

console.log(projectDisplay);
console.log(taskDisplay);


//Trying to figure out how to add tasks to projects when made
// and how to get and set values from one event listener to the other
let newProject;

projectForm.addEventListener("submit",(event) => {
    event.preventDefault();
    createNewProject(projectTitle.value);
    projectForm.reset();

});

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTask = new Task(taskTitle.value, taskDescription.value, taskNotes.value, taskDueDate.value, taskPriority.value);
    addTaskToArray(newTask);
    appendTaskToProject(newTask, newProject);
    newProject.addTasks(newTask);
    taskForm.reset();
    console.log(newProject); //logs adding project id to task id so both match
})

function createNewProject(projectTitleValue){
    newProject = new Project(projectTitleValue);
    createProjectDisplay(projectTitleValue, newProject.id);
    arrOfProjects.push(newProject);
    console.log(arrOfProjects); //logs new projects being made

    arrOfProjects.forEach(project => {
    console.log(project);
    })

    return newProject;
}

function appendTaskToProject(task, project){
    //projectDisplay.textContent = projectName;
    //taskDisplay.textContent = "heyy";

    task.id = project.id;
    console.log(task.title);
    console.log(task.description);
    console.log(task.notes);
    console.log(task.dueDate);
    console.log(task.priority);
    console.log(task.id);
    console.log(arrOfTasks)
    console.log(arrOfProjects);

    if (task.id === project.id){

        createTaskDisplay(task.title, task.description, task.notes, task.dueDate, task.priority, task.id);

    } else {
        console.log("false!");
    }

}



//Get Values of Tasks and display them 


function createTaskDisplay(title, description, notes, dueDate, priority, id){

    const taskDisplayContainer = document.createElement("div");
    taskDisplayContainer.classList.add("task-display-container");
    taskDisplayContainer.id = id;
    taskDisplay.append(taskDisplayContainer);
    

    const taskTitleDisplay = document.createElement("div");
    taskTitleDisplay.classList.add("title-value");
    taskDisplayContainer.append(taskTitleDisplay);
    taskTitleDisplay.textContent = title;
    
    const taskDescriptionDisplay = document.createElement("div");
    taskDescriptionDisplay.classList.add("description-value");
    taskDisplayContainer.append(taskDescriptionDisplay);
    taskDescriptionDisplay.textContent = description;

    const taskNotesDisplay = document.createElement("div");
    taskNotesDisplay.classList.add("notes-value");
    taskDisplayContainer.append(taskNotesDisplay);
    taskNotesDisplay.textContent = notes;

    const taskDueDateDisplay = document.createElement("div");
    taskDueDateDisplay.classList.add("due-date-value");
    taskDisplayContainer.append(taskDueDateDisplay);
    taskDueDateDisplay.textContent = dueDate;

    const taskPriorityDisplay = document.createElement("div");
    taskDescriptionDisplay.classList.add("priority-value");
    taskDisplayContainer.append(taskPriorityDisplay);
    taskPriorityDisplay.textContent = priority;

    taskDisplayContainer.addEventListener("click", (event) => {
        console.log(event.target);
    })

    
}

function createProjectDisplay(project, id){

    const projectDisplayContainer = document.createElement("div");
    projectDisplayContainer.classList.add("project-display-container");
    projectDisplay.append(projectDisplayContainer);

    const projectTitleDisplay = document.createElement("div");
    projectTitleDisplay.classList.add("project-title-value");
    projectDisplayContainer.append(projectTitleDisplay);
    projectTitleDisplay.dataset.id = id;
    projectTitleDisplay.textContent = project;

    projectDisplayContainer.addEventListener("click", (event) => {
        console.log(event.target);
        
    })


}












