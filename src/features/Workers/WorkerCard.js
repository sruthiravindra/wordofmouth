import { Card, CardImg, CardTitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

const WorkerCard = ({ worker }) => {
    const {firstName, lastName, profilePic, id} = worker;
    return (
        <Card>
            <Link to={`${id}`}>
                <Card>
                    <CardImg src={profilePic} alt='profile picture'/> 
                    <CardTitle>{firstName} {lastName}</CardTitle>
                    <CardBody>description</CardBody>
                </Card>
            </Link>
        </Card>
    )
};

export default WorkerCard;