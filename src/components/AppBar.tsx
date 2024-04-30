import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
//import Button from 'react-bootstrap/Button';
import { Task, getListParents } from "../tasks";

interface AppBarProps
{
    task: Task;
}

export default function AppBar({ task }: AppBarProps) 
{
    let breads: React.ReactNode[] = [];
    
    let parents = getListParents(task);
    
    //parents = parents.reverse();
    
    for(let i = 0; i < parents.length; i++){
        let separator = "";
        for(let s = 0; s < i; s++){
            separator += " --- ";
        }
        if(i+1 == parents.length){
            breads.push(
                <div key={parents[i].id} className="h5  m-0">
                    {separator}
                    {parents[i].title}
                </div>
            );
        }
        //onClick={()=>click(parents[i])}
        else {
            breads.push(
                <div key={parents[i].id} className="h5">
                    {separator}
                    <a className="link-light"   style={{cursor: "pointer"}}>{parents[i].title}</a>
                </div>
            );
        }
    }
    
    //let breads = parents.map(task => <div key={task.id} className="">{task.title}</div>)
    
    return (<>
        <Navbar className="navbar bg-primary text-white">
            <div className="container-fluid">
                <div className="">
                    {breads}
                </div>
                <div className="h6 m-0">0 / 8</div>
            </div>
        </Navbar>
    </>);
}

