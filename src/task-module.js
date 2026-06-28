import { activeProjectId, arrOfProjects } from "./project-module.js";

export const greeting = "Hello Odinite!";

export class Task {
    constructor(title, description, notes, dueDate, priority, id){
        this.title = title;
        this.description = description;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id;
    }
}

//const taskMethodPriority = {

    Task.prototype.sayPriority = function(){
        const saying = `This title has a priority of ${this.priority}.`
        return saying;
    }
//}

//Object.assign(Task.prototype, taskMethodPriority); 

export const arrOfTasks = [];

export const addTaskToArray = function(task){
    const addTaskToArray = arrOfTasks.push(task);
    return addTaskToArray;
}

export const taskDisplay = document.getElementById("display-task");

export function createProjectTaskPanel(projectId) { //wrapper for project tasks
    const existingPanel = getProjectTaskPanel(projectId);
    if (existingPanel) {
        return existingPanel;
    }

    const panel = document.createElement("div");
    panel.classList.add("project-task-panel");
    panel.dataset.projectId = projectId;
    panel.hidden = projectId !== activeProjectId;
    taskDisplay.append(panel);
    return panel;
}

export function getProjectTaskPanel(projectId) {
    return taskDisplay.querySelector(`.project-task-panel[data-project-id="${projectId}"]`);
}

export function createTaskForm(projectId) {
    const panel = createProjectTaskPanel(projectId);
    const form = document.createElement("form");
    form.classList.add("task-form-js");
    form.dataset.projectId = projectId;

    const taskFormFields = [
        { name: "task-title-js", id: `task-title-js-${projectId}`, label: "Title", type: "text" },                  //template literal adds project Id to the id of each field
        { name: "task-description-js", id: `task-description-js-${projectId}`, label: "Description", type: "text" },
        { name: "task-notes-js", id: `task-notes-js-${projectId}`, label: "Notes", type: "text" },
        { name: "task-dates-js", id: `task-date-js-${projectId}`, label: "Date", type: "datetime-local" },
    ];

    taskFormFields.forEach((field) => {
        const formDiv = document.createElement("div");
        formDiv.className = "form-div";
        form.append(formDiv);

        const label = document.createElement("label");
        label.htmlFor = field.id;
        label.textContent = field.label;
        formDiv.append(label);

        const input = document.createElement("input");
        input.type = field.type;
        input.name = field.name;
        input.id = field.id;
        input.required = true;
        formDiv.append(input);
    });

    const selectFormDiv = document.createElement("div");
    selectFormDiv.className = "form-div";
    form.append(selectFormDiv);

    const selectLabel = document.createElement("label");
    selectLabel.htmlFor = `task-priority-js-${projectId}`;
    selectLabel.textContent = "Priority";
    selectFormDiv.append(selectLabel);

    const select = document.createElement("select");
    select.id = `task-priority-js-${projectId}`;
    select.name = "task-priority-js";
    select.required = true;
    selectFormDiv.append(select);

    ["low", "medium", "high"].forEach((priority) => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = priority;
        select.append(option);
    });

    const formSubmitDiv = document.createElement("div");
    formSubmitDiv.className = "form-div";
    form.append(formSubmitDiv);

    const taskFormSubmit = document.createElement("button");
    taskFormSubmit.type = "submit";
    taskFormSubmit.textContent = "Submit";
    formSubmitDiv.append(taskFormSubmit);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);

       // console.log(formData);
       // console.log(formProps);

        const task = new Task(
            formProps["task-title-js"],
            formProps["task-description-js"],
            formProps["task-notes-js"],
            formProps["task-dates-js"],
            formProps["task-priority-js"],
            crypto.randomUUID(),
        );
        task.projectId = projectId;

        const project = arrOfProjects.find((proj) => proj.id === projectId);
        addTaskToArray(task);
        project.addTasks(task);
        const newTask = createTaskDisplay(task);
        appendTasktoPanel(newTask);

        form.reset();
    });

    panel.prepend(form);
    return form;
}

export const appendTasktoPanel = function(container){  //needed to abstract this part out of create Task Display
    
    if (container){                                                               
        let panel = createProjectTaskPanel(container.dataset.projectId);
        panel.append(container);
        return panel;
    } else {
        console.warn('Element not found on the page.');
    }
}

export const createTaskDisplay = function(task){ //passes in new Task object
    //const panel = createProjectTaskPanel(task.projectId);
    const taskDisplayContainer = document.createElement("div");
    taskDisplayContainer.classList.add("task-display-container");
    taskDisplayContainer.id = task.id;
    taskDisplayContainer.dataset.projectId = task.projectId;
    //panel.append(taskDisplayContainer);
    //end of appending the task display output being appended to the the project panel 

    const taskDisplayOutputs = [
        {name: "title-value", value:`${task.title}`},
        {name: "description-value", value: `${task.description}`},
        {name: "notes-value", value: `${task.notes}`},
        {name: "due-date-value", value: `${task.dueDate}`},
        {name: "priority-value", value: `${task.priority}`},
    ];

    taskDisplayOutputs.forEach((output) => {
       
        const taskOutput = document.createElement("div");
        taskOutput.className = output.name;
        taskOutput.textContent = output.value;
        taskDisplayContainer.append(taskOutput);

        if (output.name === "due-date-value"){
            const dateObj = new Date(output.value);
            const formattedDate =  dateObj.toLocaleString([], {
                dateStyle: "short",
                timeStyle: "short",
            }).replace(",", "");
            taskOutput.textContent = formattedDate;
        }
    })

    const taskDeleteButtonDiv = document.createElement("div");
    taskDeleteButtonDiv.className = "delete-button-div";
    taskDisplayContainer.append(taskDeleteButtonDiv);

    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.id = "delete-task-button";
    taskDeleteButtonDiv.append(taskDeleteButton);
    taskDeleteButton.textContent = "DELETE";

    taskDeleteButton.addEventListener("click", (event) => {

        /*if (!confirm("Are you sure you want to delete this task?")){

           // return;
        }*/

        const taskObject = arrOfTasks.findIndex((index) => index.id === task.projectId);
        arrOfTasks.splice(taskObject, 1);
        taskDisplayContainer.remove();
        console.log(arrOfTasks);
    })

    const taskEditButtonDiv = document.createElement("div");
    taskEditButtonDiv.className = "edit-button-div";
    taskDisplayContainer.append(taskEditButtonDiv);

    const taskEditButton = document.createElement("button");
    taskEditButton.id = "edit-task-button";
    taskEditButtonDiv.append(taskEditButton);
    taskEditButton.textContent = "Edit";

    taskEditButton.addEventListener("click", (event) => {
        editTaskForm(task.projectId, taskDisplayContainer);
        //console.log(taskDisplayContainer);
    
    })


    const taskCompleteDiv = document.createElement("div");
    taskCompleteDiv.className = "task-complete";
    taskDisplayContainer.append(taskCompleteDiv); 

    const taskComplete = document.createElement("input");
    taskComplete.type = "checkbox";
    taskComplete.id = "task-complete";
    taskComplete.name = "task-complete";
    taskComplete.value = "task-complete";
    taskComplete.checked = false;
    taskCompleteDiv.append(taskComplete);

    const taskCompleteLabel = document.createElement("label");
    taskCompleteLabel.htmlFor = "task-complete";
    taskCompleteLabel.textContent = "Complete";
    taskCompleteDiv.append(taskCompleteLabel);

    taskComplete.addEventListener("change", (event) => {
        console.log(event.target);

        if(event.target.checked === true){
            taskDisplayContainer.classList.toggle("active");
        } else {
            taskDisplayContainer.classList.toggle("active");
        }
    })

    return taskDisplayContainer;
}

export const updateTaskDisplay = function(oldContainer, newContainer){

    const update = oldContainer.replaceWith(newContainer);
    return update;
}

export const editTaskForm = function(projectId, oldContainer) {
    const dialog = document.createElement("dialog")
    const dialogDiv = document.createElement("div");
    dialogDiv.className = "dialog-div";
    
    const form = document.createElement("form");
    form.classList.add("task-form-js");
    form.dataset.projectId = projectId;

    const taskFormFields = [
        { name: "task-title-js", id: `task-title-js-${projectId}`, label: "Title", type: "text" },                  //template literal adds project Id to the id of each field
        { name: "task-description-js", id: `task-description-js-${projectId}`, label: "Description", type: "text" },
        { name: "task-notes-js", id: `task-notes-js-${projectId}`, label: "Notes", type: "text" },
        { name: "task-dates-js", id: `task-date-js-${projectId}`, label: "Date", type: "datetime-local" },
    ];

    taskFormFields.forEach((field) => {
        const formDiv = document.createElement("div");
        formDiv.className = "form-div";
        form.append(formDiv);

        const label = document.createElement("label");
        label.htmlFor = field.id;
        label.textContent = field.label;
        formDiv.append(label);

        const input = document.createElement("input");
        input.type = field.type;
        input.name = field.name;
        input.id = field.id;
        input.required = true;
        formDiv.append(input);
    });

    const selectFormDiv = document.createElement("div");
    selectFormDiv.className = "form-div";
    form.append(selectFormDiv);

    const selectLabel = document.createElement("label");
    selectLabel.htmlFor = `task-priority-js-${projectId}`;
    selectLabel.textContent = "Priority";
    selectFormDiv.append(selectLabel);

    const select = document.createElement("select");
    select.id = `task-priority-js-${projectId}`;
    select.name = "task-priority-js";
    select.required = true;
    selectFormDiv.append(select);

    ["low", "medium", "high"].forEach((priority) => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = priority;
        select.append(option);
    });

    const formSaveDiv = document.createElement("div");
    formSaveDiv.className = "form-div";
    form.append(formSaveDiv);

    const taskFormSave = document.createElement("button");
    taskFormSave.type = "submit";
    taskFormSave.textContent = "Save";
    formSaveDiv.append(taskFormSave);

    const formCancelDiv = document.createElement("div");
    formCancelDiv.className = "form-div";
    form.append(formCancelDiv);

    const taskFormCancel = document.createElement("button");
    taskFormCancel.id = "cancel";
    taskFormCancel.textContent = "Cancel";
    formCancelDiv.append(taskFormCancel);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);

        console.log(formData);
        console.log(formProps);

        const task = new Task(
            formProps["task-title-js"],
            formProps["task-description-js"],
            formProps["task-notes-js"],
            formProps["task-dates-js"],
            formProps["task-priority-js"],
            crypto.randomUUID(),
        );
        task.projectId = projectId;

        const project = arrOfProjects.find((proj) => proj.id === projectId);
        addTaskToArray(task);
        project.addTasks(task);
        const newTask = createTaskDisplay(task);
        const updatedTask = updateTaskDisplay(oldContainer, newTask)
        appendTasktoPanel(updatedTask);
        dialog.close();
        form.reset();
    });

    taskFormCancel.addEventListener("click", () => {
        dialog.close();
    })

    dialogDiv.append(form);
    dialog.append(dialogDiv);
    oldContainer.append(dialog);
    dialog.showModal();

    return form;
}


