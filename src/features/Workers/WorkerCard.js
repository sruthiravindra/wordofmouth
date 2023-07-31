import { Card, Button, Col, Row,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import StarRating from '../Reviews/StarRating';
import ServiceList from '../services/ServiceList';
import { selectCurrentUser } from '../user/userSlice';
import { useSelector } from 'react-redux';

const WorkerCard = ({ worker }) => {
    const {firstName, lastName, profilePic, id, rating, contacts, services, phone, email} = worker;
    const currentUser = useSelector(selectCurrentUser);

    return (
        <Card className='mb-2 p-2'>
            <Row className=''>
                <Col xs='2' lg='1'>
                    <div class='flex-shrink-0'>
                        <img 
                        src={profilePic} 
                        alt='profile picture'
                        className='img-fluid'/>
                    </div>
                </Col>
                <Col className='d-flex justify-content-start align-items-center'>
                    <Link to={`${id}`} className='unstyledLink'>
                        <h5 className='d-inline'>{firstName} {lastName}</h5>
                        <StarRating rating={rating}/><p className='d-inline'>({rating})</p>
                    </Link>
                </Col>
                <Col className='d-flex justify-content-end pe-3' xs='3'>
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
            <Row>
                <Col>
                    <ServiceList serviceIds={services}/>
                    <p className='ms-2 banner'>location  |  payment  |  {contacts.length} customers</p>
                </Col>
            </Row>
        </Card>
    )
};

export default WorkerCard;