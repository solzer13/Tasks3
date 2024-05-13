//import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { Task, Tasks, countTasksByParent, countTasksDoneByParent, sortByPosition } from "../tasks";

interface TasksListProps
{
    tasks: Task[];
}

export default function TasksList({ tasks }: TasksListProps)
{
    if(tasks.length == 0){
        return (<Container className="text-center m-5">Список пуст</Container>);
    }
    
    tasks = sortByPosition(tasks);

    return (
        <>
            {tasks.map((task, index) =>
                <TasksListItem 
                    key={index} 
                    task={task}
                    count={tasks.length}
                    stc={countTasksByParent(task.id, true)}
                    stdc={countTasksDoneByParent(task.id)}
                />
            )}
        </>
    );
}

interface TasksListItemProps
{
    task: Task;
    count: number;
    stc: number;
    stdc: number;
}

function TasksListItem({ task, count, stc, stdc }: TasksListItemProps)
{
    return (
        <div className="card text-bg-light m-1">
            <div className="card-body p-1">
                <div className="hstack">
                    <Link className="w-100 p-1 link-dark link-underline-opacity-0" to={"/tasks/" + task.id}>
                        <div className={(task.done ? "text-decoration-line-through  " : "")+"h5 p-0 m-0"}>{task.title}</div>
                        <div className="text-secondary small p-0 m-0">{stdc} / {stc}</div>
                    </Link>
                    <div className="p-1">
            
                        <Dropdown>
                          <Dropdown.Toggle variant="light">
                            <i className="bi bi-three-dots-vertical"></i>
                          </Dropdown.Toggle>
                    
                          <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link to={"/task/done/"+task.id+"/"} className="link-dark link-underline-opacity-0">{task.done ? "Не сделано" : "Сделано"}</Link>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item disabled={task.position == 1}>
                                <Link to={"/task/up/"+task.id+"/"} className="link-dark link-underline-opacity-0">Вверх</Link>
                            </Dropdown.Item>
                            <Dropdown.Item disabled={task.position == count}>
                                <Link to={"/task/down/"+task.id+"/"} className="link-dark link-underline-opacity-0">Вниз</Link>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Link to={"/task/edit/"+task.id+"/"} className="link-dark link-underline-opacity-0">Редактировать</Link>
                            </Dropdown.Item> 
                            <Dropdown.Item>
                                <Link to={"/task/delete/"+task.id+"/"} className="link-dark link-underline-opacity-0">Удалить</Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
    
                    </div>
                </div>
            </div>
        </div>
    );
}