import { Card, Button, Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

import { createRequest, findRequestByToId } from '../requests/requestsSlice';
import { selectCurrentUser } from '../user/userSlice';
import { axiosPost } from '../../utils/axiosConfig';
import StarRating from '../reviews/StarRating';
import ServiceList from '../services/ServiceList';
import ReviewCarousel from '../reviews/ReviewCarousel';
import Loading from '../../components/Loading';
import '../../css/features/workers.css';

const WorkerCard = ({ worker }) => {
    const {first_name, last_name, profile_pic, _id: id, rating, services, email, phone, _id} = worker;
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [reviewsError, setReviewsError] = useState('');
    const [reviewsArray, setReviewsArray] = useState([]);
    const [requestLoading, setRequestLoading] = useState(false);
    const [reqBtnClicked, setReqBtnClicked] = useState(false);
    let inContacts = null;
    let requestSent = useSelector(findRequestByToId(id));
    if (currentUser) { 
        inContacts = currentUser.contacts.find(contact => contact._id === id) 
    }

    useEffect(() => {
        axiosPost('reviews/fetchReviews', { filter_reviewed_user_id: _id })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    setReviewsArray(response.data);
                    setReviewsLoading(false);
                } else {
                    setReviewsError('Failed to fetch reviews :: ' + response.data.message);
                }
            })
            .catch((err) => {
                setReviewsError('Failed to fetch reviews :: ' + err);
            })
    }, [])

    const requestContact = () => {
        if (currentUser) {
            setRequestLoading(true);
            setReqBtnClicked(true);
            const request = {
                from_id: currentUser._id,
                to_id: id
            }
            dispatch(createRequest(request))
                .then(response => {
                    if (response.error) {
                        toast("Failed to Send Request: " + response.error.message, {
                            position: "bottom-right",
                            theme: "light",
                            type: "error"
                        });
                    } else {
                        toast("Contact Request Sent!", {
                            position: "bottom-right",
                            theme: "light",
                            type: "success"
                        });
                    }
                })
                .finally(() => { setRequestLoading(false) });
        } else {
            alert('Must be logged in to request contact');
        }
    }

    const RequestContactButton = () => {
        return requestLoading
        ? (<Loading />)
        : inContacts 
        ? (<>
            {phone && (
                <Button>
                    <FontAwesomeIcon icon={faPhone} />
                </Button>)}
            {email && (
                <Button>
                    <FontAwesomeIcon icon={faEnvelope} />
                </Button>)}
        </>)
        : requestSent || reqBtnClicked
        ? (<p className='request-sent'>request sent</p>)
        : (<Button onClick={requestContact}>Request Contact</Button>)
    }

    return (
        <Card className={ inContacts ? 'worker-card-in-contacts' : 'worker-card'}>
            <Container fluid>
                <Row className='worker-header'>
                    <Col className='location' xs='8'>
                        <FontAwesomeIcon icon={faLocationDot} className='d-inline me-1'/>
                        <p className='d-inline mb-0'>{`... km away`}</p>
                    </Col>
                    <Col className='request-btn-col'>
                        <RequestContactButton />
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
                    {  
                        reviewsLoading ? (<div><Loading/></div>) 
                        : reviewsError ? (<p>{reviewsError}</p>)
                        : reviewsArray.length === 0 ? (
                            <div>
                                <p>This worker doesn't have any reviews yet...</p>
                            </div>
                        )
                        : (<ReviewCarousel reviewsArray={reviewsArray} />) 
                    }
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