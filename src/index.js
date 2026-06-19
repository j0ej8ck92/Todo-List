import "./styles.css";
import {greeting, Task, addTaskToArray, arrOfTasks} from "./task-module.js";

console.log(greeting);


const firstTask = new Task("run", "three miles", "under 25 mins", "June 4, 2026", "medium");

const secondTask = new Task("jog", "four miles", "under 50 mins", "June 18, 2026", "high");


/*const taskButton = document.querySelector(".add-task");

console.log(taskButton);

taskButton.addEventListener("click", () => addTaskToArray());*/


console.log(firstTask);

console.log(firstTask.sayPriority());

addTaskToArray(firstTask);
addTaskToArray(secondTask);

console.log(arrOfTasks);

const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskNotes = document.getElementById("task-notes");
const taskDueDate = document.getElementById("task-due-date");
const taskPriority = document.getElementById("task-priority");
const taskSubmitButton = document.getElementById("task-submit");

/*taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTask = new Task(taskTitle.value, taskDescription.value, taskNotes.value, taskDueDate.value, taskPriority.value);
    console.log(newTask);
    addTaskToArray(newTask);
    taskForm.reset();
})*/


const getArr = arrOfTasks[1].sayPriority(); //useful for using methods within task Array of task class objects!
                                      
console.log(getArr);

console.log(arrOfTasks[1].notes);

class Project {
    constructor(project, arrOfProjectTasks = []){
        this.project = project;
        this.projectTasks = [...arrOfProjectTasks];
    }

    addTasks(tasks){
        this.projectTasks.push(tasks);
    }
}

const projectOne = new Project("Coding");


projectOne.addTasks(firstTask);
projectOne.addTasks(secondTask);


console.log(projectOne);

const projectForm = document.getElementById("project-form");
const projectTitle = document.getElementById("project-title");
const projectSubmitButton = document.getElementById("project-submit");

/*projectForm.addEventListener("submit",(event) => {
    event.preventDefault();
    processNewProject(projectTitle.value);
    projectForm.reset();
});*/

//Trying to figure out how to add tasks to projects when made

function handleEvents(){

    projectForm.addEventListener("submit",(event) => {
        event.preventDefault();
        processNewProject(projectTitle.value);
        projectForm.reset();

    });

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newTask = new Task(taskTitle.value, taskDescription.value, taskNotes.value, taskDueDate.value, taskPriority.value);
        console.log(newTask);
        addTaskToArray(newTask);
        newProject.addTasks(newTask);
        taskForm.reset();
    })

    let newProject;

    function processNewProject(projectTitleValue){
        newProject = new Project(projectTitleValue);
        console.log(newProject);
        return newProject
    }

    function appendTaskToProject(project, append){
        return project.addTasks(append);
    }

    const yolo = processNewProject("yolo");
    appendTaskToProject(yolo, firstTask);

}

handleEvents();

/*function processNewProject(projectTitleValue){
    const newProject = new Project(projectTitleValue);
    console.log(newProject);
    return newProject
}

const yolo = processNewProject("yolo");

function appendTaskToProject(project, append){
    return project.addTasks(append);
}

appendTaskToProject(yolo, firstTask);*/

