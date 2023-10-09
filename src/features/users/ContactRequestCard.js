import { Card, Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import StarRating from '../reviews/StarRating';
import ServiceList from '../services/ServiceList';
import AddContactButton from './AddContactButton';

const ContactRequestCard = ({ contact }) => {
    const {firstName, lastName, profilePic, id, rating, services} = contact;

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
                                {
                                    (contact.worker === true) ? (
                                        <ServiceList serviceIds={services}/>
                                    ) : (
                                        <></>
                                    )
                                }
                                <p>Status: pending</p>
                                <p>Sent: date/time</p>
                            </Col>
                            {
                                (contact.worker === false) ? (
                                    <Col>
                                        <AddContactButton contactId={id} />
                                    </Col>
                                ) : (
                                    <></>
                                )

                            }
                        </Row>
                    </div>
                </div>
            </Card>
        </>
    )
};

export default ContactRequestCard;