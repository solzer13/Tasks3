
import Button from 'react-bootstrap/Button';

interface FloatActionProps 
{
    click: ()=>void;
}

export default function FloatAction({ click }: FloatActionProps) 
{
    return (<>
        <div className = "position-absolute bottom-0 end-0 rounded-circle m-4" >
            <Button variant="primary" size="lg" onClick={click}>
                <i className="bi bi-plus-lg"></i>
            </Button>
        </div>
    </>);
}
