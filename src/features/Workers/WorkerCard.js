import { Card, Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import StarRating from '../Reviews/StarRating';
import ServiceList from '../services/ServiceList';
import { selectCurrentUser } from '../user/userSlice';
import { useSelector } from 'react-redux';

const WorkerCard = ({ worker }) => {
    const {firstName, lastName, profilePic, id, rating, contacts, services, phone, email} = worker;
    const currentUser = useSelector(selectCurrentUser);

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
                            <ServiceList serviceIds={services}/>
                            <p>location  |  payment  |  {contacts.length} customers</p>
                        </Col>
                        <Col className='d-flex justify-content-end pe-3'>
                            { 
                                (currentUser && currentUser.contacts.includes(id)) ?
                                    (<div className='text-end'>
                                        <Button className='btn-sm mb-1 d-block'>{phone}</Button>
                                        <Button className='btn-sm d-block'>{email}</Button>
                                    </div>) :
                                (<Button className='btn-sm'>Request contact</Button>)
                            }
                        </Col>
                    </Row>
                </div>
            </div>
        </Card>
    )
};

export default WorkerCard;