export class Project {
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

export const arrOfProjects = [];

export const createNewProject = function(projectTitleValue){
    const project = new Project(projectTitleValue);
    arrOfProjects.push(project);
    createProjectDisplay(project.project, project.id);
    //setActiveProject(project.id);
    return project;
}

export let activeProjectId = null;

export function setActiveProject(projectId) { //check Create Project function
    activeProjectId = projectId;

    document.querySelectorAll(".project-display-container").forEach((element) => {
        element.classList.toggle("active", element.dataset.projectId === projectId);
    });

    document.querySelectorAll(".task-display-container").forEach((element) => {
        element.hidden = element.dataset.projectId !== projectId;
    });
}

const projectDisplay = document.getElementById("display-project");

export const createProjectDisplay = function(project, id){
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
}



