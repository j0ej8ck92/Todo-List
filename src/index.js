import "./styles.css";
import {greeting, Task, createTaskDisplay, appendTasktoPanel, createTaskForm, addTaskToArray, arrOfTasks} from "./task-module.js";
import {Project, createNewProject, createProjectDisplay, setActiveProject, activeProjectId, arrOfProjects} from "./project-module.js";

console.log(greeting);


const firstTask = new Task("run", "three miles", "under 25 mins", "June 4, 2026", "medium");
const secondTask = new Task("jog", "four miles", "under 50 mins", "June 18, 2026", "high");
//const thirdTask = new Task("walk", "ten miles", "under 6 hours", "July 10, 2026", "mild");


console.log(firstTask);

console.log(firstTask.sayPriority());

addTaskToArray(firstTask);
addTaskToArray(secondTask);
//addTaskToArray(thirdTask);

console.log(arrOfTasks);

/*const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskNotes = document.getElementById("task-notes");
const taskDueDate = document.getElementById("task-due-date");
const taskPriority = document.getElementById("task-priority");
const taskSubmitButton = document.getElementById("task-submit");
*/
const wrapper = document.querySelector(".wrapper");
console.log(wrapper);

export function displayTaskFormJS(projectId) {
    return createTaskForm(projectId);
}


const getArr = arrOfTasks[1].sayPriority(); //useful for using methods within task Array of task class objects!
                                      
console.log(getArr);

console.log(arrOfTasks[1].notes);

const projectOne = new Project("Coding");

arrOfProjects.push(projectOne);
projectOne.addTasks(firstTask);
projectOne.addTasks(secondTask);

console.log(arrOfProjects);
console.log(projectOne);

const projectForm = document.getElementById("project-form");
const projectTitle = document.getElementById("project-title");
const projectSubmitButton = document.getElementById("project-submit");



projectForm.addEventListener("submit",(event) => {
    event.preventDefault();
    createNewProject(projectTitle.value);
    console.log(arrOfProjects);
    projectForm.reset();
    //displayTaskFormJS(taskFormJS);
    console.log(arrOfTasks);

    //const showTaskForm = displayTaskFormJS(taskFormJS);

    

});

/*taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!activeProjectId) {
        alert("Select a project first");
        return;
    }

    

    const project = arrOfProjects.find((proj) => proj.id === activeProjectId); //In the array of projects it finds the id of the project that stricly matches the activeProjectId
    const newTask = new Task(taskTitle.value, taskDescription.value, taskNotes.value, taskDueDate.value, taskPriority.value);
    newTask.id = crypto.randomUUID();
    newTask.projectId = project.id; //once all projects are deleted can't produce task because of this


    addTaskToArray(newTask);
    project.addTasks(newTask);
    createTaskDisplay(newTask);
    taskForm.reset();
    console.log(arrOfTasks);
}
*/


//firstTask.id = crypto.randomUUID(); 
firstTask.projectId = projectOne.id;
//secondTask.id = crypto.randomUUID();
secondTask.projectId = projectOne.id;

//createProjectDisplay(projectOne.projectName, projectOne.id);
//displayTaskFormJS(projectOne.id);
//const firstTaskContainer = createTaskDisplay(firstTask);
//const secondTaskContainer = createTaskDisplay(secondTask);
//appendTasktoPanel(firstTaskContainer);
//appendTasktoPanel(secondTaskContainer);

//setActiveProject(projectOne.id);












