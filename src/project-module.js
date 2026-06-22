import { arrOfTasks } from "./task-module.js";

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
    setActiveProject(project.id);
    return project;
}

export let activeProjectId = null; //used to toggle between active state of the project being clicked 

export function setActiveProject(projectId) { //check Create Project function, passes in the data-project-id or dataset.projectID
    activeProjectId = projectId; // creates a way set and disablee the projects that are being clicked 

    document.querySelectorAll(".project-display-container").forEach((element) => { //activate active class for project elements clicked
        element.classList.toggle("active", element.dataset.projectId === projectId); // checks to see if the element matches the passing of the argument stated in line 30
    });

    document.querySelectorAll(".task-display-container").forEach((element) => { //grabs all the elements selected and hides them on the DOM if
        element.hidden = element.dataset.projectId !== projectId;                //their data-project-id doesn't match with the project clicked
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
    
        const projectElement = arrOfProjects.findIndex((element) => element.id === project.projectId);
        arrOfProjects.splice(projectElement, 1);
        projectDisplayContainer.remove();

        const taskElements = document.querySelectorAll(".task-display-container").forEach((element) => {
            
                if(element.dataset.projectId === projectDisplayContainer.dataset.projectId){

                    element.remove();
            }
        })
        console.log(arrOfProjects);
    })
}



