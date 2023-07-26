import { Card, Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './WorkerCard.css';
import StarRating from '../Reviews/StarRating';
import ServiceList from '../services/ServiceList';

const WorkerCard = ({ worker }) => {
    const {firstName, lastName, profilePic, id, rating, contacts, services} = worker;

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
                        <Col>
                            <Link to={`${id}`} className='unstyledLink'>
                                <h5 className='d-inline'>{firstName} {lastName}</h5>
                                <StarRating rating={rating}/><p className='d-inline'>({rating})</p>
                            </Link>
                        </Col>
                        <Col className='d-flex justify-content-end pe-3'>
                            <Button className='btn-sm'>Request contact</Button>
                        </Col>
                    </Row>
                    <ServiceList serviceIds={services}/>
                    <p>location  |  payment  |  {contacts.length} customers</p>
                </div>
            </div>
        </Card>
    )
};

export default WorkerCard;