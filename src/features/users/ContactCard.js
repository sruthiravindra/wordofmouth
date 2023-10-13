import { Card, Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import StarRating from '../reviews/StarRating';
import ServiceList from '../services/ServiceList';

const ContactCard = ({ contact }) => {
    const {first_name, last_name, profile_pic, _id, rating, services, email, phone} = contact;

    return (
        <>
            <Card className='contact-card'>
                <Row>
                    <Col xs='2'>
                        <img 
                        src={profile_pic} 
                        alt={`${first_name} ${last_name}`}
                        className='img-fluid contact-img'/>
                    </Col>
                    <Col xs='10' className='contact-card-info'>
                        <Row className=''>
                            <Col className='sm-8'>
                                <Link to={`/services/${_id}`} className='unstyledLink'>
                                    <h5 className='d-inline'>{first_name} {last_name}</h5>
                                    <StarRating rating={rating}/><p className='d-inline'>({rating})</p>
                                </Link>
                                <ServiceList serviceIds={services}/>
                            </Col>
                            <Col className='sm-4 d-flex justify-content-end'>
                                <div className='text-end'>
                                    <Button className='d-block mb-1'>{phone}</Button>
                                    <Button className='d-block'>{email}</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    )
};

export default ContactCard;