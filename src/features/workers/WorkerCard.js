import { Card, Button, Col, Row, Container, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons';
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
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [reviewsError, setReviewsError] = useState('');
    const [reviewsArray, setReviewsArray] = useState([]);
    const [requestLoading, setRequestLoading] = useState(false);
    const [phoneTooltip, setPhoneTooltip] = useState(false);
    const [emailTooltip, setEmailTooltip] =  useState(false);
    const [imgTooltip, setImgTooltip] =  useState(false);
    let inContacts = null;
    let requestSent = useSelector(findRequestByToId(id));
    const dispatch = useDispatch();

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
                .finally(() => { 
                    setRequestLoading(false);
                });
        } else {
            alert('Must be logged in to request contact');
        }
    }

    const RequestContactButton = () => {
        return requestLoading
        ? (<Loading />)
        : requestSent
        ? (<p className='request-sent'>request sent</p>)
        : inContacts 
        ? (<></>)
        : (<Button onClick={requestContact}>Request Contact</Button>)
    }

    return (
        <Card className='worker-card'>
            <Container fluid>
                <Row className='worker-header'>
                    <Col className='location' xs='8'>
                        <FontAwesomeIcon icon={faLocationDot} className='d-inline me-1'/>
                        <p className='d-inline mb-0'>{`... km away`}</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs='2' lg='1'>
                        <div className='flex-shrink-0' id={`img-${id}`}>
                            <img 
                            src={profile_pic} 
                            alt='profile picture'
                            className='img-fluid profile-pic-small'/>
                        </div>
                        <Tooltip
                            placement = "bottom"
                            isOpen = {imgTooltip}
                            toggle = {() => setImgTooltip(!imgTooltip)}
                            autohide = {true}
                            target = {`#img-${id}`}
                        >
                            {email}
                        </Tooltip>
                    </Col>
                    <Col xs='6' md='7' className='worker-info'>
                        <div className='name-and-rating'>
                            <Link to={`/worker/${id}`}>
                                <p className='d-inline'>{first_name} {last_name}</p>
                                <StarRating rating={rating}/><p className='rating'>({rating})</p>
                            </Link>
                        </div>
                        <div className='mt-2'>
                            <ServiceList serviceIds={services} />
                        </div>
                    </Col>
                    <Col className='request-btn-col'>
                        <RequestContactButton />
                        {phone && inContacts && (
                            <><div id={`phone-${id}`}>
                                <Button className='contact-btn'>
                                <FontAwesomeIcon icon={faPhone} />
                                </Button>
                            </div>
                            <Tooltip
                                placement = "bottom"
                                isOpen = {phoneTooltip}
                                toggle = {() => setPhoneTooltip(!phoneTooltip)}
                                autohide = {false}
                                target = {`phone-${id}`}
                            >
                                {phone}
                            </Tooltip>  
                            </>)}
                            {email && inContacts && (
                            <><div id={`email-${id}`}>
                                <Button className='contact-btn'>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </Button>
                            </div>
                            <Tooltip
                                placement = "bottom"
                                isOpen = {emailTooltip}
                                toggle = {() => setEmailTooltip(!emailTooltip)}
                                autohide = {false}
                                target = {`email-${id}`}
                            >
                                {email}
                            </Tooltip>
                        </>)}
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