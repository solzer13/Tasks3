import { useState, forwardRef } from "react";
import { Outlet, Form, Link } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <Outlet />
        </>
    );
}
