import { StrictMode, useState, useTransition } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import MainLayout from "./components/MainLayout";

import { TasksPage, TasksLoader } from "./pages/Tasks";
import { TaskPage, TaskLoader, TaskAction } from "./pages/Task";
import { SettingsPage, SettingsLoader, SettingsAction } from "./pages/Settings";
import NotFoundPage from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                path: "tasks/:id?",
                loader: TasksLoader,
                element: <TasksPage parent={0} />
            },
            {
                path: "task/:action/:id",
                loader: TaskLoader,
                action: TaskAction,
                element: <TaskPage />
            },
            {
                path: "settings",
                loader: SettingsLoader,
                action: SettingsAction,
                element: <SettingsPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
]);

let container = document.getElementById("root");

if (container) {
    createRoot(container).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
}
