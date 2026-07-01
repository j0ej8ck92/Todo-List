import "./styles.css";
import {greeting, Task, createTaskDisplay, updateTaskDisplay, appendTasktoPanel, createTaskForm, addTaskToArray, arrOfTasks} from "./task-module.js";
import {Project, createNewProject, createProjectDisplay, setActiveProject, activeProjectId, arrOfProjects, removeElementByValue} from "./project-module.js";

console.log(greeting);

const wrapper = document.querySelector(".wrapper");
const projectForm = document.getElementById("project-form");
const projectTitle = document.getElementById("project-title");
const projectSubmitButton = document.getElementById("project-submit");



const projects = JSON.parse(localStorage.getItem("project-displays")) || [];


//if (projects.length === 0){
   /* const firstTask = new Task("run", "three miles", "under 25 mins", "June 4, 2026", "medium");
    const secondTask = new Task("jog", "four miles", "under 50 mins", "June 18, 2026", "high");
    //const thirdTask = new Task("walk", "ten miles", "under 6 hours", "July 10, 2026", "mild");
    console.log(firstTask);
    console.log(firstTask.sayPriority());
    addTaskToArray(firstTask);
    addTaskToArray(secondTask);
    //addTaskToArray(thirdTask);
    console.log(arrOfTasks);
    const projectOne = new Project("Coding");
    arrOfProjects.push(projectOne);
    projectOne.addTasks(firstTask);
    projectOne.addTasks(secondTask);
    console.log(arrOfProjects);
    console.log(projectOne);
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
    */


export function displayTaskFormJS(projectId) {
    return createTaskForm(projectId);
}
/*const getArr = arrOfTasks[1].sayPriority(); //useful for using methods within task Array of task class objects!
                                      
console.log(getArr);

console.log(arrOfTasks[1].notes);
*/

projectForm.addEventListener("submit",(event) => {
    event.preventDefault();
    

    createNewProject(projectTitle.value);
    console.log(arrOfProjects);
    projectForm.reset();
    console.log(arrOfTasks);
    setStorage();
    projectForm.reset(); //keep  this at the bottom of your event listeners!

});

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
        
    })

    console.log(allTaskData);

    localStorage.setItem("task-displays", JSON.stringify(allTaskData)); //sets tasks

    console.log(localStorage);
}

    


export function getStorage(){

    const projects = JSON.parse(localStorage.getItem("project-displays")) || [];
    console.log(projects);

    projects.forEach(project => {
        const savedProject = createNewProject(project.projectName);
        console.log(savedProject);
        return savedProject;
    })

    const tasks = JSON.parse(localStorage.getItem("task-displays")) || [];
    console.log(tasks);

    tasks.forEach(savedTask => {

        const task = new Task(
            savedTask.title,
            savedTask.description,
            savedTask.notes,
            savedTask.dueDate,
            savedTask.priority
        );
        task.projectId = savedTask.projectId;

        console.log(arrOfProjects);

        
        //const project = arrOfProjects.find((proj) => proj.id === projectId);
        addTaskToArray(task);
        //project.addTasks(task);
        //project.addTasks(task);
        console.log(task);
        const newTask = createTaskDisplay(task);
        appendTasktoPanel(newTask);
        return appendTasktoPanel(newTask);
    })
}


    getStorage();
    

//localStorage.clear();

 










