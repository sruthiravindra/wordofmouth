//library imports
import { Card, Button, Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
//local imports
import StarRating from '../reviews/StarRating';
import ServiceList from '../services/ServiceList';
import ReviewCarousel from '../reviews/ReviewCarousel';
import { createRequest } from '../requests/requestsSlice';
import { selectCurrentUser } from '../user/userSlice';

const WorkerCard = ({ worker }) => {
    const {first_name, last_name, profile_pic, _id: id, rating, services, address} = worker;
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const requestContact = () => {
        if (currentUser) {
            const request = {
                from_id: currentUser._id,
                to_id: id
            }
            dispatch(createRequest(request));
        } else {
            alert('Must be logged in to request contact');
        }
    }

    return (
        <Card className='worker-card p-0'>
            <Container fluid>
                <Row className='worker-header'>
                    <Col className='location' xs='8'>
                        <FontAwesomeIcon icon={faLocationDot} className='d-inline me-1'/>
                        <p className='d-inline mb-0'>{`... km away`}</p>
                    </Col>
                    <Col className='request-btn-col'>
                        <Button onClick={requestContact}>Request Contact</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs='3' sm='2' lg='1'>
                        <div className='flex-shrink-0'>
                            <img 
                            src={profile_pic} 
                            alt='profile picture'
                            className='img-fluid profile-pic-small'/>
                        </div>
                    </Col>
                    <Col className='d-flex flex-column justify-content-center'>
                        <Link to={`/worker/${id}`} className='unstyledLink'>
                            <h5 className='d-inline'>{first_name} {last_name}</h5>
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

// import GetGeocode from '../../utils/GetGeocode';
// import getDistance from '../../utils/getDistance';
// import { useEffect, useState } from 'react';


// const [distanceAway, setDistanceAway] = useState('...');


    // useEffect(() => {
    //     if (currentUserGeocode) {
    //         GetGeocode(address)
    //             .then((coordinates) => {
    //                 if (coordinates) {
    //                     const { latitude:lat2, longitude:lng2 } = coordinates;
    //                     const { latitude:lat1, longitude:lng1 } = currentUserGeocode;
    //                     const distance = getDistance(lat1, lng1, lat2, lng2);
    //                     setDistanceAway(Math.floor(distance));
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             })
    //     } else {
    //         setDistanceAway('...');
    //     }
    // }, [currentUserGeocode])