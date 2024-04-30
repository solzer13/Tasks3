
export class Task 
{
    id: number = 0;
    parent: number = 0;
    done: boolean = false;
    position: number = 0;
    
    constructor(public title = ""){}
}

let list = [new Task("tas1"), new Task("tas2"), new Task("tas3")];

export function getListAll(): Task[]{
    return list;
}

export function getListByParent(parent: number): Task[]{
    return getListAll().filter(task => task.parent == parent);
}

export function getTaskById(id: number){
    return getListAll().find(task => task.id == id);
}
    
export function getListParents(task: Task = new Task(), parents: Task[] = []){
    if(task.id != 0){
        parents.push(task);
        getListParents(getTaskById(task.parent) ?? new Task(), parents);
    } 
    else {
        parents.push(new Task("Tasks"));
        parents = parents.reverse();
    }
    
    return parents;
}
    
export function editTask(task: Task){
    list = getListAll().map(item => item.id == task.id ? task : item);
}

export function deleteTask(task: Task){
    list = getListAll().filter(item => item.id != task.id);
}

export class Tasks 
{
    private _list: Task[] = [];
    
    public constructor(){
    }

    public get list(){
        return this._list;
    }
    
    public async getAllList(){
        let result = await fetch("/getTasks");
        this._list = await result.json();
        return;
    }
    
    public getListByParent(parent: number):Task[]{
        return this._list.filter(task => task.parent == parent);
    }
    
    public getTaskById(id: number){
        return this._list.find(task => task.id == id);
    }
    
    public getTaskByPosition(parent: number, position: number){
        return this.getListByParent(parent).find(task => task.position == position);
    }
    
    public add(title: string, parent: number){
        let id = this._list.length+1;
        let position = id;
        let done = false;
        this._list.push({ id, parent, title, done, position });
        this._save();
    }
    
    public del(task: Task){
        this._list = this._list.filter(item => item.id != task.id);
        this._save();
    }
    
    public edit(task: Task){
        this._list = this._list.map(item => item.id == task.id ? task : item);
        this._save();
    }
    
    private _save(){
        fetch('/setTasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this._list)
        });
    }
}

