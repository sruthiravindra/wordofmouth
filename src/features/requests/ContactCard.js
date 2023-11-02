import { Card, Button, Col, Row, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import StarRating from '../reviews/StarRating';
import ServiceList from '../services/ServiceList';
import '../../css/features/requests.css';

const ContactCard = ({ contact }) => {
    const {first_name, last_name, profile_pic, _id, rating, services, email, phone} = contact;
    const [phoneTooltip, setPhoneTooltip] = useState(false);
    const [emailTooltip, setEmailTooltip] =  useState(false);

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
                                {/* <Button>Leave a review</Button> */}
                                {
                                    phone && (<>
                                        <Button id={`phone-${_id}`} href={`tel:${phone}`}>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </Button>
                                        <Tooltip
                                            placement="bottom"
                                            isOpen={phoneTooltip}
                                            toggle={() => setPhoneTooltip(!phoneTooltip)}
                                            autohide={false}
                                            target={`#phone-${_id}`}
                                        >
                                            {phone}
                                        </Tooltip>
                                    </>)     
                                }
                                {
                                    email && (<>
                                        <Button id={`email-${_id}`} href={`mailto:${email}`}>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </Button>
                                        <Tooltip
                                            placement="bottom"
                                            isOpen={emailTooltip}
                                            toggle={() => setEmailTooltip(!emailTooltip)}
                                            autohide={false}
                                            target={`email-${_id}`}
                                        >
                                            {email}
                                        </Tooltip>
                                    </>)
                                }
                            </div>
                    </Col>
                </Row>
            </Card>
        </>
    )
};

export default ContactCard;