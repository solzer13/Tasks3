import { Form } from "react-router-dom";
import Button from "react-bootstrap/Button";

interface FloatActionProps {
    parent: number;
}

export default function FloatAction({ parent }: FloatActionProps) {
    return (
        <div className="position-absolute bottom-0 end-0 rounded-circle m-4">
            <Form action={"/task/add/"+parent}>
                <Button type="submit" variant="primary" size="lg">
                    <i className="bi bi-plus-lg"></i>
                </Button>
            </Form>
        </div>
    );
}
