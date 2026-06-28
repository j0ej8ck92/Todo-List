import { arrOfTasks, createTaskForm } from "./task-module.js";

export class Project {
    constructor(projectName, arrOfProjectTasks = []){
        this.projectName = projectName;
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

export const arrOfProjects = [];

export const createNewProject = function(projectTitleValue){
    const project = new Project(projectTitleValue);
    arrOfProjects.push(project);
    createProjectDisplay(project.projectName, project.id); //grabs the object and passes in the properties of the project Object
    createTaskForm(project.id);
    setActiveProject(project.id);
    return project;
}

export let activeProjectId = null; //used to toggle between active state of the specific project being clicked 

export function setActiveProject(projectId) { //check Create Project function, passes in the data-project-id or dataset.projectID
    activeProjectId = projectId; // creates a way to set and disable the projects that are being clicked 

    document.querySelectorAll(".project-display-container").forEach((element) => { //activate active class for project elements clicked
        element.classList.toggle("active", element.dataset.projectId === projectId); // checks to see if the element matches the passing of the argument stated in line 30
    });

    document.querySelectorAll(".project-task-panel").forEach((element) => { //only have to hide the project panel because is the parent of task form and tasks created
        element.hidden = element.dataset.projectId !== projectId;
    });
}

const projectDisplay = document.getElementById("display-project");

export const createProjectDisplay = function(project, id){ //passes in the .projectName and .id of Project Object
    const projectDisplayContainer = document.createElement("div");
    projectDisplayContainer.classList.add("project-display-container");
    projectDisplayContainer.dataset.projectId = id;
    projectDisplay.append(projectDisplayContainer);

    const projectTitleDisplay = document.createElement("div");
    projectTitleDisplay.classList.add("project-title-value");
    projectDisplayContainer.append(projectTitleDisplay);
    projectTitleDisplay.textContent = project;

    projectDisplayContainer.addEventListener("click", () => {
        setActiveProject(id);
    });

    const projectDeleteButtonDiv = document.createElement("div");
    projectDeleteButtonDiv.classList.add("delete-button-div");
    projectDisplayContainer.append(projectDeleteButtonDiv);
    
    const projectDeleteButton = document.createElement("button");
    projectDeleteButton.id = "delete-project-button";
    projectDeleteButtonDiv.append(projectDeleteButton);
    projectDeleteButton.textContent = "DELETE";
    
    projectDeleteButton.addEventListener("click", (event) => {
    
        //if (!confirm("Are you sure you want to delete this project?")){
    
           // return;
       // }
    
        const projectElement = arrOfProjects.findIndex((element) => element.id === id);
        arrOfProjects.splice(projectElement, 1);
        projectDisplayContainer.remove();

        const projectTaskPanel = document.querySelector(
            `.project-task-panel[data-project-id="${projectDisplayContainer.dataset.projectId}"]`, //selects the project task panel that matches with
        );                                                                                         //project display container using the dataset attribute project id 
        projectTaskPanel?.remove();                                                                // by using template literal
        console.log(arrOfProjects);
        console.log(arrOfTasks);
        console.log(projectTaskPanel);
    })
}



