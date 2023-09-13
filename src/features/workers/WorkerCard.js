import { Card, Button, Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import StarRating from '../reviews/StarRating';
import ServiceList from '../services/ServiceList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ReviewCarousel from '../reviews/ReviewCarousel';

const WorkerCard = ({ worker }) => {
    const {firstName, lastName, profilePic, id, rating, services, address} = worker;
    
    return (
        <Card className='worker-card p-0'>
            <Container fluid>
                <Row className='worker-header'>
                    <Col className='location' xs='8'>
                        <FontAwesomeIcon icon={faLocationDot} className='d-inline me-1'/>
                        <p className='d-inline mb-0'>{address}</p>
                    </Col>
                    <Col className='request-btn-col'>
                        <Button>Request Contact</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs='3' sm='2' lg='1'>
                        <div class='flex-shrink-0'>
                            <img 
                            src={profilePic} 
                            alt='profile picture'
                            className='img-fluid profile-pic-small'/>
                        </div>
                    </Col>
                    <Col className='d-flex flex-column justify-content-center'>
                        <Link to={`${id}`} className='unstyledLink'>
                            <h5 className='d-inline'>{firstName} {lastName}</h5>
                            <StarRating rating={rating}/><p className='d-inline'>({rating})</p>
                        </Link>
                        <div className='mt-2'>
                            <ServiceList serviceIds={services} />
                        </div>
                    </Col>
                </Row>
                <Row className='my-2'>
                </Row>
                <Row className='mb-3'>
                    <ReviewCarousel userId={id}/>
                </Row>
            </Container>
        </Card>
    )
};

export default WorkerCard;