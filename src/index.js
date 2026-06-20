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


projectOne.addTasks(firstTask);
projectOne.addTasks(secondTask);


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
    processNewProject(projectTitle.value);
    projectForm.reset();

});

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTask = new Task(taskTitle.value, taskDescription.value, taskNotes.value, taskDueDate.value, taskPriority.value);
    addTaskToArray(newTask);
    appendTaskIdToProject(newTask, newProject);
    newProject.addTasks(newTask);
    taskForm.reset();
    console.log(newProject); //logs adding project id to task id so both match
})

function processNewProject(projectTitleValue){
    newProject = new Project(projectTitleValue);
    projectDisplay.textContent = projectTitleValue;
    console.log(newProject); //logs new project being made
    return newProject;
}

function appendTaskIdToProject(task, project){
    //projectDisplay.textContent = projectName;
    taskDisplay.textContent = "heyy";

    task.id = project.id;
    console.log(task.title);
    console.log(task.description);
    console.log(task.notes);
    console.log(task.dueDate);
    console.log(task.priority);
    console.log(task.id);
    console.log(arrOfTasks)
    console.log(arrOfProjects);

    arrOfTasks.forEach(element => {
        //console.log(element.id);

        if (element.id === project.id){
        console.log(element.id);
        console.log(project.id);
    

        } else {
            console.log("false!"); //runs false twice because first two elements in array
                                   //do not have assigned ids!
        }
    })
}

projectDisplay.textContent = "nice";





