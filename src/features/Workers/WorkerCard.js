import { Card, CardTitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './WorkerCard.css';

const WorkerCard = ({ worker }) => {
    const {firstName, lastName, profilePic, id, rating, contacts} = worker;
    return (
        <Card className='mb-2'>
            <Link to={`${id}`}>
                <div className='d-flex align-items-center p-1'>
                    <div class='flex-shrink-0'>
                        <img 
                        src={profilePic} 
                        alt='profile picture'
                        width='150px'/>
                    </div>
                    <div class='flex-grow-1 ms-3'>
                        <h5 className='mt-2'>{firstName} {lastName} ({rating})</h5>
                        <h6>gardening</h6>
                        <p className='pe-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar risus felis, eu venenatis ligula molestie vel. Aenean vitae enim fringilla, commodo turpis at, egestas diam.</p>
                        <p>location  |  payment  |  {contacts.length} customers</p>
                    </div>
                </div>
            </Link>
        </Card>
    )
};

export default WorkerCard;