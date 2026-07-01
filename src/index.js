import "./styles.css";
import {greeting, Task, createTaskDisplay, updateTaskDisplay, appendTasktoPanel, createTaskForm, addTaskToArray, arrOfTasks} from "./task-module.js";
import {Project, createNewProject, createProjectDisplay, setActiveProject, activeProjectId, arrOfProjects, removeElementByValue} from "./project-module.js";

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
    //setStorage();
    /*console.log(projectTitle.value);
    //sets the projectTitle value into local storage
    const projectKey = projectTitle.value;
    if(projectKey){
         localStorage.setItem("project-title", projectKey);
         console.log(localStorage);
    } else{
        console.log("try again buster");
    }
        */
    

    createNewProject(projectTitle.value);
    console.log(arrOfProjects);
    projectForm.reset();
    console.log(arrOfTasks);

    console.log(projectTitle.value); //for some reason doesn't log value when here but does before passed in to function
    /*const projectData = new FormData(event.target);
    const projectProps = Object.fromEntries(projectData);
    console.log(projectProps);
    */

    setStorage();

    projectForm.reset(); //keep  this at the bottom of your event listeners!

});



//firstTask.id = crypto.randomUUID(); 
firstTask.projectId = projectOne.id;
//secondTask.id = crypto.randomUUID();
secondTask.projectId = projectOne.id;
createProjectDisplay(projectOne.projectName, projectOne.id);
displayTaskFormJS(projectOne.id);
const firstTaskContainer = createTaskDisplay(firstTask);
const secondTaskContainer = createTaskDisplay(secondTask);
const appendFirstTask = appendTasktoPanel(firstTaskContainer);
const appendSecondTask = appendTasktoPanel(secondTaskContainer);
setActiveProject(projectOne.id);

console.log(localStorage);

export const setStorage = function(task){

    const projectDisplays = document.querySelectorAll(".project-display-container");
    console.log(projectDisplays);

    const allProjectData = Array.from(projectDisplays).map(project => {
        const projectKids = project.children;
        return {
            projectName: projectKids[0].textContent,
            projectId: project.dataset.projectId,
        }
    })

    localStorage.setItem("project-displays", JSON.stringify(allProjectData)); //sets projects

    
    const taskDisplays = document.querySelectorAll(".task-display-container");

    const allTaskData = Array.from(taskDisplays).map(task => {
        const taskKids = task.children;

        return {
            title: taskKids[0].textContent,
            description: taskKids[1].textContent,
            notes: taskKids[2].textContent,
            dueDate: taskKids[3].textContent,
            priority: taskKids[4].textContent,
            projectId: task.dataset.projectId,
        }
        /*const childValues = Array.from(kids).map(kid => kid.textContent);
        return childValues.slice(0,-3);*/
    })

    console.log(allTaskData);

    localStorage.setItem("task-displays", JSON.stringify(allTaskData)); //sets tasks

    console.log(localStorage);
}

    


export const getStorage = function(){

    const projects = JSON.parse(localStorage.getItem("project-displays")) || [];
    const savedProjects = projects.slice(1);
    console.log(savedProjects);

    savedProjects.forEach(project => {
        const savedProject = createNewProject(project.projectName);
        console.log(savedProject);
        return savedProject;
    })

    const tasks = JSON.parse(localStorage.getItem("task-displays")) || [];
    const savedTasks = tasks.slice(2);
    console.log(savedTasks);

    savedTasks.forEach(task => {
        const newTask = createTaskDisplay(task);
        console.log(newTask);
        return appendTasktoPanel(newTask);
    })
}

getStorage();

//setStorage();
//getStorage();

//localStorage.clear();

 










