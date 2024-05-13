import {
    type ActionFunctionArgs,
    type LoaderFunctionArgs,
    Form,
    useParams,
    useLoaderData,
    useActionData,
    redirect
} from "react-router-dom";
import { Settings } from "../settings";
import AppBar from "../components/AppBar";

export async function SettingsLoader({ params }: LoaderFunctionArgs) {
    return new Settings();
}

export async function SettingsAction({ request }: ActionFunctionArgs) {
    let formData = await request.formData();

    const settings = new Settings();

    settings.server = (formData.get("server") ?? "") as string;
    settings.token = (formData.get("token") ?? "") as string;
    
    settings.save();
    
    return redirect("/tasks/");
}

export function SettingsPage(){
    let settings = useLoaderData() as Settings;
    return (
        <>
            <AppBar title="Settings" />
            <Form className="p-3" method="post">
                <div className="mb-3">
                    <input
                        placeholder="Server"
                        type="text"
                        className="form-control"
                        name="server"
                        defaultValue={settings.server ?? ""}
                    />
                </div>
                <div className="mb-3">
                    <input
                        placeholder="Token"
                        type="text"
                        className="form-control"
                        name="token"
                        defaultValue={settings.token ?? ""}
                    />
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
