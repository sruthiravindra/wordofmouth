import { Card, Button, Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { updateRequest } from './requestsSlice';
import StarRating from '../reviews/StarRating';
import '../../css/features/requests.css';

const ContactRequestCard = ({ request }) => {
    const {first_name, last_name, profile_pic, rating, _id: user_id } = request.from_users[0];
    const { _id: request_id, status } = request;
    const dispatch = useDispatch();

    const approveRequest = () => {
        const data = {
            request_id: request_id,
            from_id: user_id,
            status: 'Approved'
        }
        dispatch(updateRequest(data))
            .then((response) => {
                if (response.error) {
                    toast("Failed to approve request: " + response.error.message);
                } else {
                    toast("Request approved!");
                }
            });
    }

    const declineRequest = () => {
        const data = {
            request_id: request_id,
            from_id: null,
            status: 'Declined'
        }
        dispatch(updateRequest(data))
            .then((response) => {
                if (response.error) {
                    toast("Failed to decline request: " + response.error.message);
                } else {
                    toast("Request declined! The user will not be notified.");
                }
            });
    }

    return (
        <>
            <Card className='contact-request'>
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
                                <p>Status: {status}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='contact-request-btns'>
                        <Button className='request-reply-btn' onClick={approveRequest}>Approve</Button>
                        <Button className='request-reply-btn decline' onClick={declineRequest}>Decline</Button>
                    </Col>
                </Row>
            </Card>
        </>
    )
};

export default ContactRequestCard;