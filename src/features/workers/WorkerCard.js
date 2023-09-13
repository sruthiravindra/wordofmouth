import { Card, Button, Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StarRating from '../reviews/StarRating';
import ServiceList from '../services/ServiceList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ReviewCarousel from '../reviews/ReviewCarousel';
import GetGeocode from '../../utils/GetGeocode';
import getDistance from '../../utils/getDistance';
import { current } from '@reduxjs/toolkit';

const WorkerCard = ({ worker, currentUserGeocode }) => {
    const {firstName, lastName, profilePic, id, rating, services, address} = worker;
    const [distanceAway, setDistanceAway] = useState('...');

    useEffect(() => {
        if (currentUserGeocode) {
            GetGeocode(address)
                .then((coordinates) => {
                    if (coordinates) {
                        const { latitude:lat2, longitude:lng2 } = coordinates;
                        const { latitude:lat1, longitude:lng1 } = currentUserGeocode;
                        const distance = getDistance(lat1, lng1, lat2, lng2);
                        setDistanceAway(Math.floor(distance));
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        } else {
            setDistanceAway('...');
        }
    }, [currentUserGeocode])

    return (
        <Card className='worker-card p-0'>
            <Container fluid>
                <Row className='worker-header'>
                    <Col className='location' xs='8'>
                        <FontAwesomeIcon icon={faLocationDot} className='d-inline me-1'/>
                        <p className='d-inline mb-0'>{`${distanceAway} km away`}</p>
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
                        <Link to={`/worker/${id}`} className='unstyledLink'>
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