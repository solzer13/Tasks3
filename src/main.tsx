import { StrictMode, useState, useTransition } from 'react';
import { createRoot } from "react-dom/client";
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import IndexPage from "./pages/Index";
import TaskPage from "./pages/Task";
import SettingsPage from "./pages/Settings";
import AppBar from "./components/AppBar";
import FloatAction from "./components/FloatAction";
import { Task, getListParents } from "./tasks";

function MainLayout()
{
    const [isPending, startTransition] = useTransition();
    const [page, setPage] = useState('index');

    function selectTab(nextTab: string) {
        startTransition(() => {
            setPage(nextTab);
        });
    }
    
    function clickTaskHandler(task: Task) {
        //setParent(task);console.log(task)
        //setParents(getParents(task));
        //setTasksList([...tasks.getListByParent(task.id)]);
    }
    
    let task = new Task();
    
    return (
        <>
            <AppBar task={task} />
            <Outlet />
            <FloatAction click={()=>{}} />
        </>
    );
}

let container = document.getElementById('root');

if(container)
{
    createRoot(container).render(
        <StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                      <Route path="tasks" element={<IndexPage parent={0} />} />
                      <Route path="task" element={<TaskPage />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </StrictMode>
    );
}
