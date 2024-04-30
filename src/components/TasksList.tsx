//import React from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
//import Button from 'react-bootstrap/Button';
import { Task } from "../tasks";

interface TasksListProps
{
    tasks: Task[];
    click: (task: Task) => void;
    done: (task: Task) => void;
    up: (task: Task) => void;
    down: (task: Task) => void;
    edit: (task: Task) => void;
    del: (task: Task) => void;
}

export default function TasksList({ tasks, click, done, up, down, edit, del }: TasksListProps)
{
    if(tasks.length == 0){
        return (<Container className="text-center m-5">Список пуст</Container>);
    }
    
    let stasks = tasks.sort((a, b) => {
        if(a.position > b.position) return 1;
        if(a.position < b.position) return -1;
        return 0;
    });
    
    const listItems = stasks.map(task =>
        <TasksListItem 
            key={task.id} 
            task={task} 
            click={click}
            done={done} 
            up={up} 
            down={down} 
            edit={edit} 
            del={del} 
            count={tasks.length}
        />
    );

    return (<>{listItems}</>);
}

interface TasksListItemProps
{
    task: Task;
    click: (task: Task) => void;
    done: (task: Task) => void;
    up: (task: Task) => void;
    down: (task: Task) => void;
    edit: (task: Task) => void;
    del: (task: Task) => void;
    count: number;
}

function TasksListItem({ task, click, done, up, down, edit, del, count }: TasksListItemProps)
{
    return (
        <div className="card text-bg-light m-1">
            <div className="card-body p-1">
                <div className="hstack">
                    <div className="w-100 p-1" onClick={()=>click(task)} style={{cursor: "pointer"}}>
                        <div className={(task.done ? "text-decoration-line-through  " : "")+"h5 p-0 m-0"}>{task.title}</div>
                        <div className="text-secondary small p-0 m-0">0 / 8</div>
                    </div>
                    <div className="p-1">
            
                        <Dropdown>
                          <Dropdown.Toggle variant="light">
                            <i className="bi bi-three-dots-vertical"></i>
                          </Dropdown.Toggle>
                    
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{ task.done = !task.done; done(task)}}>{task.done ? "Не сделано" : "Сделано"}</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={()=>up(task)} disabled={task.position == 1}>Вверх</Dropdown.Item>
                            <Dropdown.Item onClick={()=>down(task)} disabled={task.position == count}>Вниз</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={()=>edit(task)}>Редактировать</Dropdown.Item> 
                            <Dropdown.Item onClick={()=>del(task)}>Удалить</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
    
                    </div>
                </div>
            </div>
        </div>
    );
}