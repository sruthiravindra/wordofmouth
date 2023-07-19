import { Card, Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './WorkerCard.css';

const WorkerCard = ({ worker }) => {
    const {firstName, lastName, profilePic, id, rating, contacts} = worker;
    return (
        <Card className='mb-2'>
            <div className='d-flex align-items-center p-1'>
                <div class='flex-shrink-0'>
                    <img 
                    src={profilePic} 
                    alt='profile picture'
                    width='150px'/>
                </div>
                <div class='flex-grow-1 ms-3'>
                    <Row className='mt-1'>
                        <Col sm='6'>
                            <Link to={`${id}`} textDecoration='none'>
                                <h5>{firstName} {lastName} ({rating})</h5>
                                <h6>gardening</h6>
                            </Link>
                        </Col>
                        <Col sm='6' className='d-flex justify-content-end pe-3'>
                            <Button className='btn-sm'>Request contact</Button>
                        </Col>
                    </Row>

                    <p className='pe-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar risus felis, eu venenatis ligula molestie vel. Aenean vitae enim fringilla, commodo turpis at, egestas diam.</p>
                    <p>location  |  payment  |  {contacts.length} customers</p>
                </div>
            </div>
        </Card>
    )
};

export default WorkerCard;