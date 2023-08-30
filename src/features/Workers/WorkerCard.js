import { Card, Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import StarRating from '../reviews/StarRating';
import ServiceList from '../services/ServiceList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ReviewCarousel from '../reviews/ReviewCarousel';

const WorkerCard = ({ worker }) => {
    const {firstName, lastName, profilePic, id, rating, services, address} = worker;
    
    return (
        <Card className='mb-2 p-2'>
            <Row className=''>
                <Col xs='2' lg='1'>
                    <div class='flex-shrink-0'>
                        <img 
                        src={profilePic} 
                        alt='profile picture'
                        className='img-fluid profile-pic-small'/>
                    </div>
                </Col>
                <Col className=''>
                    <Link to={`${id}`} className='unstyledLink'>
                        <h5 className='d-inline'>{firstName} {lastName}</h5>
                        <StarRating rating={rating}/><p className='d-inline'>({rating})</p>
                    </Link>
                    <div className='location'>
                        <FontAwesomeIcon icon={faLocationDot} className='d-inline me-1'/>
                        <p className='d-inline'>{address}</p>
                    </div>
                    <ServiceList serviceIds={services}/>
                </Col>
                <Col className='d-flex justify-content-end pe-3' xs='3'>
                   <Button>Request Contact</Button>
                </Col>
            </Row>
            <Row>
                <ReviewCarousel userId={id}/>
            </Row>
        </Card>
    )
};

export default WorkerCard;