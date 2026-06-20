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


export const addTaskToArray = function(task){
    const addTaskToArray = arrOfTasks.push(task);
    return addTaskToArray;
}

export const arrOfTasks = [];


