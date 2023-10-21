import { Card, Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import StarRating from '../reviews/StarRating';
import { formatDate } from '../../utils/formatDate';

const ContactRequestSentCard = ({ request }) => {
    const {first_name, last_name, profile_pic, rating, _id: user_id } = request.to_users[0];
    const { createdAt } = request;

    return (
        <>
            <Card className='contact-request sent'>
                <Row>
                    <Col xs='2' md='1'>
                        <img 
                        src={profile_pic} 
                        alt={`${first_name} ${last_name}`}
                        className='img-fluid contact-img'/>
                    </Col>
                    <Col className='contact-request-info'>
                        <Row className='mt-1'>
                            <Col className='sm-8'>
                                <NavLink to={`/worker/${user_id}`} className='unstyledLink'>
                                    <h5 className='d-inline'>{first_name} {last_name}</h5>
                                    <StarRating rating={rating}/><p className='d-inline'>({rating})</p>
                                </NavLink>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='contact-request-btns'>
                        <p className='mb-0 me-1'>Sent: {formatDate(createdAt)}</p>
                    </Col>
                </Row>
            </Card>
        </>
    )
};

export default ContactRequestSentCard;