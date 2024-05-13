import { useState } from "react";
import { Link } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Task, getListParents, countTasksByParent, countTasksDoneByParent } from "../tasks";

interface AppBarProps {
    title: string;
}

export default function AppBar({ title }: AppBarProps) {
    document.title = title;
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="navbar d-flex bg-primary text-white">
                <button
                    type="button"
                    onClick={handleShow}
                    className="btn btn-primary mx-2 my-0 pt-1 pb-0 px-1"
                >
                    <i className="bi bi-list h1"></i>
                </button>
                <div className="flex-grow-1 h5 p-0 m-0">{title}</div>
                <div className="h6 px-4 m-0">{countTasksDoneByParent(0)} / {countTasksByParent(0, true)}</div>
            </div>

            <Offcanvas show={show} onHide={handleClose} backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="list-group">
                        <li className="list-group-item"><Link onClick={handleClose} to="/tasks/">Tasks</Link></li>
                        <li className="list-group-item"><Link onClick={handleClose} to="/settings/">Settings</Link></li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
