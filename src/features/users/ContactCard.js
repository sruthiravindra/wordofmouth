import { Card, Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
                    <Col className='contact-card-info'>
                            <div>
                                <Link to={`/services/worker/${_id}`} className='unstyledLink'>
                                    <h5 className='d-inline'>{first_name} {last_name}</h5>
                                    <StarRating rating={rating}/><p className='d-inline'>({rating})</p>
                                </Link>
                                <ServiceList serviceIds={services}/>
                            </div>
                            <div className='contact-info-btns'>
                                <Button>Leave a review</Button>
                                {
                                    phone && (<Button>
                                        <FontAwesomeIcon icon={faPhone} />
                                            {`${phone}`}
                                    </Button>)
                                }
                                {
                                    email && (<Button>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        {`${email}`}
                                    </Button>)
                                }
                            </div>
                    </Col>
                </Row>
            </Card>
        </>
    )
};

export default ContactCard;