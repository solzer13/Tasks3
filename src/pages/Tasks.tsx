import { useState } from "react";
import {
    type ActionFunctionArgs,
    type LoaderFunctionArgs,
    useParams,
    useLoaderData
} from "react-router-dom";

import AppBar from "../components/AppBar";
import FloatAction from "../components/FloatAction";
import TasksList from "../components/TasksList";
import { Task, getListByParent, getTaskById } from "../tasks";

interface TasksPageProps {
    parent: number;
}

export async function TasksLoader({
    params
}: LoaderFunctionArgs): Promise<Task[]> {
    const id = (params.id ?? 0) as number;
    return getListByParent(id);
}

export function TasksPage({ parent }: TasksPageProps) {
    const params = useParams();
    const tasks = useLoaderData() as Task[];
    const taskId = (params.id ?? 0) as number;

    return (
        <>
            <AppBar title={taskId == 0 ? "Tasks" : getTaskById(params.id).title} />
            <TasksList
                tasks={tasks}
            />
            <FloatAction parent={taskId} />
        </>
    );
}
