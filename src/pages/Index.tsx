import { useState } from "react";
import TasksList from "../components/TasksList";
import { Task, getListByParent, editTask, deleteTask } from "../tasks";

interface IndexPageProps
{
    parent: number;
}

export default function IndexPage({parent}: IndexPageProps){
    
    const [getTasksList, setTasksList] = useState(getListByParent(parent));
    
    function clickTaskHandler(task: Task) {
        //setParent(task);console.log(task)
        //setParents(getParents(task));
        setTasksList([...getListByParent(task.id)]);
    }
    
    function doneClickHandler(task: Task) {
        editTask(task);
        setTasksList([...getListByParent(parent)]);
    }
    
    function upClickHandler(task: Task) {
        // if(task.position > 1){
        //     let task2 = tasks.getTaskByPosition(task.parent, task.position-1);
        //     if(task2){
        //         task2.position++;
        //         task.position--;
        //         tasks.edit(task);
        //         tasks.edit(task2);
        //         setTasksList([...tasks.getListByParent(parent.id)]);
        //     }
        // }
    }
    
    function downClickHandler(task: Task) {
        // if(task.position < tasks.list.length){
        //     let task2 = tasks.getTaskByPosition(task.parent, task.position+1);
        //     if(task2){
        //         task2.position--;
        //         task.position++;
        //         tasks.edit(task);
        //         tasks.edit(task2);
        //         setTasksList([...tasks.getListByParent(parent.id)]);
        //     }
        // }
    }
    
    function editClickHandler(task: Task) {
        //setEditWindowData(task);
        //setEditWindowVisible(true);
    }
    
    function delClickHandler(task: Task) {
        deleteTask(task);
        setTasksList([...getListByParent(parent)]);
    }
    
    return (
        <>
            <TasksList 
                tasks={getTasksList} 
                click={clickTaskHandler} 
                done={doneClickHandler} 
                up={upClickHandler}
                down={downClickHandler}
                edit={editClickHandler}
                del={delClickHandler}
            />
        </>
    );
}
