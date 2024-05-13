export class Task {
    id: number|string = 0;
    parent: number = 0;
    done: boolean = false;
    position: number = 0;

    constructor(public title = "") {}
}

const TASKS_KEY = "tasks";

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (
            +c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
        ).toString(16)
    );
}

export function saveTasks(tasks: Task[]): void {
    return localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function getListAll(): Task[] {
    let tasks: Task[] = [];
    let data = localStorage.getItem(TASKS_KEY);
    
    if(data){
        tasks = JSON.parse(data);
    }

    return tasks;
}

export function getListByParent(parent: number): Task[] {
    return getListAll().filter(task => task.parent == parent);
}

export function countTasksByParent(parent: number, recursive: boolean = false): number {
    const listParent = getListByParent(parent);
    if(!recursive)
        return listParent.length;
    let count = listParent.length;
    listParent.forEach(item => count += countTasksByParent(item.id, true));
    return count;
}

export function countTasksDoneByParent(parent: number): number {
    const list = new Tasks().parent(parent).list;
    let count = new Tasks().parent(parent).done(true).count;
    list.forEach(item => count += countTasksDoneByParent(item.id));
    return count;
}

export function getTaskById(id: number): Task {
    const task = getListAll().find(task => task.id == id);
    if(task)
        return task;
    else
        throw("Task not found.")
}

export function getTaskByPosition(parent: number, position: number) {
    return getListByParent(parent).find(task => task.position == position);
}

export function getListParents(task: Task = new Task(), parents: Task[] = []) {
    if (task.id != 0) {
        parents.push(task);
        getListParents(getTaskById(task.parent) ?? new Task(), parents);
    } else {
        parents.push(new Task("Tasks"));
        parents = parents.reverse();
    }

    return parents;
}

export function sortByPosition(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
        if (a.position > b.position) return 1;
        if (a.position < b.position) return -1;
        return 0;
    });
}

export function addTask(title: string, parent: number = 0, done: boolean = false) {
    const task = new Task();
    
    task.id = uuidv4();
    task.title = title;
    task.parent = parent;
    task.done = done;
    task.position = countTasksByParent(parent) + 1;
    
    let tasks = getListAll();
    
    tasks.push(task);
    
    saveTasks(tasks);
}

export function upTask(task: Task) {
    if (task.position > 1) {
        let task2 = getTaskByPosition(task.parent, task.position - 1);
        if (task2) {
            task2.position++;
            task.position--;
            editTask(task);
            editTask(task2);
        }
    }
}

export function downTask(task: Task) {
    if (task.position < countTasksByParent(task.parent)) {
        let task2 = getTaskByPosition(task.parent, task.position + 1);
        if (task2) {
            task2.position--;
            task.position++;
            editTask(task);
            editTask(task2);
        }
    }
}

export function editTask(task: Task) {
    saveTasks(getListAll().map(item => (item.id == task.id ? task : item)));
}

export function deleteTask(task: Task) {
    const tasks = getListAll().filter(item => item.id != task.id);

    saveTasks(
        tasks.map(item => {
            if (item.position > task.position) {
                item.position--;
            }
            return item;
        })
    );
}

export class Tasks {
    private tasks: Task[] = [];

    public constructor() {
        const data = localStorage.getItem(TASKS_KEY);
    
        if(data){
            this.tasks = JSON.parse(data);
        }
    }

    public get list() {
        return this.tasks;
    }
    
    public get count() {
        return this.tasks.length;
    }
    
    public id(id: number){
        const result = this.result.find(task => task.id == id);
        if(!result)
            throw("Task not found.")
        return result;
    }

    public parent(parent: number){
        this.tasks = this.tasks.filter(task => task.parent == parent);
        return this;
    }
    
    public done(done: boolean){
        this.tasks = this.tasks.filter(task => task.done == done);
        return this;
    }

    public position(position: number) {
        const result = this.tasks.find(task => task.position == position);
        if(!result)
            throw("Task not found.")
        return result;
    }

    public add(title: string, parent: number) {
        let id = this._list.length + 1;
        let position = id;
        let done = false;
        this._list.push({ id, parent, title, done, position });
        this._save();
    }

    public del(task: Task) {
        this._list = this._list.filter(item => item.id != task.id);
        this._save();
    }

    public edit(task: Task) {
        this._list = this._list.map(item => (item.id == task.id ? task : item));
        this._save();
    }

    private _save() {
        fetch("/setTasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(this._list)
        });
    }
}
