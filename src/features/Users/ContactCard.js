import { Card, Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import StarRating from '../Reviews/StarRating';
import ServiceList from '../services/ServiceList';

const ContactCard = ({ contact }) => {
    const {firstName, lastName, profilePic, id, rating, contacts, services, email, phone} = contact;

    return (
        <>
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
                            <Col className='sm-8'>
                                <Link to={`/services/${id}`} className='unstyledLink'>
                                    <h5 className='d-inline'>{firstName} {lastName}</h5>
                                    <StarRating rating={rating}/><p className='d-inline'>({rating})</p>
                                </Link>
                                <ServiceList serviceIds={services}/>
                            </Col>
                            <Col className='sm-4 d-flex justify-content-end'>
                                <div clasName='text-end'>
                                    <Button className='d-block mb-1'>{phone}</Button>
                                    <Button className='d-block'>{email}</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Card>
        </>
    )
};

export default ContactCard;