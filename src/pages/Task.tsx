import {
    type ActionFunctionArgs,
    type LoaderFunctionArgs,
    Form,
    useParams,
    useLoaderData,
    useActionData,
    redirect
} from "react-router-dom";
import AppBar from "../components/AppBar";
import {
    Task,
    getTaskById,
    addTask,
    upTask,
    downTask,
    editTask,
    deleteTask
} from "../tasks";

export async function TaskLoader({ params }: LoaderFunctionArgs) {
    let task = new Task();

    if (params) {
        const id = (params.id ?? 0) as number;
        if (id != 0) task = getTaskById(id);
    }

    switch (params.action) {
        case "add":
            const new_task = new Task();
            new_task.parent = (params.id ?? 0) as number;
            return new_task;
            break;

        case "edit":
            return task;
            break;

        case "done":
            task.done = !task.done;
            editTask(task);
            break;

        case "up":
            upTask(task);
            break;

        case "down":
            downTask(task);
            break;

        case "delete":
            deleteTask(task);
            break;
    }
    return redirect("/tasks/" + task!.parent);
}

class Errors {
    public title: boolean = false;
}

export async function TaskAction({ request }: ActionFunctionArgs) {
    let formData = await request.formData();

    const errors = new Errors();

    const task = new Task();

    task.id = (formData.get("id") ?? "") as string;
    task.title = (formData.get("title") ?? "") as string;
    task.parent = (formData.get("parent") ?? 0) as number;
    task.done = formData.get("done") == "on";
    task.position = (formData.get("position") ?? 0) as number;

    if (!task.title) {
        errors.title = true;
    } else {
        if (task.id == "0") {
            addTask(task.title, task.parent, task.done);
        } else {
            editTask(task);
        }
        return redirect("/tasks/" + task.parent);
    }

    return errors;
}

export function TaskPage() {
    let task = useLoaderData() as Task;
    let title = task.id == 0 ? "Add task" : "Edit task";
    let error = useActionData() as any;

    return (
        <>
            <AppBar title={title} />
            <Form className="p-3" method="post">
                <input type="hidden" name="id" defaultValue={task.id ?? 0} />
                <input
                    type="hidden"
                    name="parent"
                    defaultValue={task.parent ?? 0}
                />
                <input
                    type="hidden"
                    name="position"
                    defaultValue={task.position ?? 0}
                />

                <div className="mb-3">
                    <input
                        placeholder="Text of task"
                        type="text"
                        className={
                            "form-control" + (error?.title ? " is-invalid" : "")
                        }
                        name="title"
                        defaultValue={task.title ?? ""}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        name="done"
                        className="form-check-input"
                        id="exampleCheck1"
                        defaultChecked={task.done}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Done
                    </label>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary m-2">
                        Save
                    </button>
                </div>
            </Form>
        </>
    );
}
