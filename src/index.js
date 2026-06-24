import "./styles.css";
import {greeting, Task, createTaskDisplay, addTaskToArray, arrOfTasks} from "./task-module.js";
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

const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskNotes = document.getElementById("task-notes");
const taskDueDate = document.getElementById("task-due-date");
const taskPriority = document.getElementById("task-priority");
const taskSubmitButton = document.getElementById("task-submit");
const wrapper = document.querySelector(".wrapper");
console.log(wrapper);

const taskFormJS = document.createElement("form");
console.log(taskFormJS);


function displayTaskFormJS(form){
    
    form.id = "task-form-JS";
    const taskFormData = [

        {name: "task-title-JS", id: "task-title-JS", label: "Title", type: "text"},
        {name: "task-description-JS", id: "task-description-JS", label: "Description", type: "text"},
        {name: "task-notes-JS", id: "task-notes-JS", label: "Notes", type: "text"},
        {name: "task-dates-JS", id: "task-date-JS", label: "Date", type: "datetime-local"},
        //{name: "task-priority-JS", id: "priority-JS", label: "Priority" : "select" }
    ];

    taskFormData.forEach(task => {

        const formDiv = document.createElement("div");
        formDiv.className = "form-div";
        form.append(formDiv);

        const label = document.createElement("label");
        label.htmlFor = task.id;
        label.textContent = task.label;
        formDiv.append(label);

        const input = document.createElement("input");

        if (input.type !== "text"){

            input.type = "datetimme-local";
        }
        input.type = task.type;
        input.name = task.name;
        input.id = task.id;
        input.required = true;
        formDiv.append(input);
    })

    const selectFormDiv = document.createElement("div");
    selectFormDiv.className = "form-div";
    form.append(selectFormDiv);

    const selectLabel = document.createElement("label");
    selectLabel.htmlFor = "task-priority-JS"
    selectFormDiv.append(selectLabel);

    const select = document.createElement("select");
    select.id = "task-priority-JS";
    select.name = "task-priority-JS";
    selectFormDiv.append(select);

    const selectPriorities = ["low", "medium", "high"];

    selectPriorities.forEach(priority => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = priority;
        select.append(option);


    })


    return wrapper.append(form);


}

const taskFormData = [ ///Just using this to be able to display task objects for input

        {name: "task-title-JS", id: "task-title-JS", label: "Title", type: "text"},
        {name: "task-description-JS", id: "task-description-JS", label: "Description", type: "text"},
        {name: "task-notes-JS", id: "task-notes-JS", label: "Notes", type: "text"},
        {name: "task-dates-JS", id: "task-date-JS", label: "Date", type: "datetime-local"},
    ];

    console.log(taskFormData);
    console.log(taskFormData[3].name); //able to use array index and dot notation for to get value of object properties!! lets go!!

    



const showTaskForm = displayTaskFormJS(taskFormJS);


    

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
    

});

taskForm.addEventListener("submit", (event) => {
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
})



//firstTask.id = crypto.randomUUID(); 
firstTask.projectId = projectOne.id;
//secondTask.id = crypto.randomUUID();
secondTask.projectId = projectOne.id;

createProjectDisplay(projectOne.projectName, projectOne.id);
createTaskDisplay(firstTask);
createTaskDisplay(secondTask);
setActiveProject(projectOne.id);












