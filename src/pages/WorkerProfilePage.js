import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { fetchWorkerProfile } from "../features/workers/workersSlice";
import { findRequestByToId, createRequest } from "../features/requests/requestsSlice";
import { selectCurrentUser } from "../features/user/userSlice";
import Loading from "../components/Loading";
import StarRating from "../features/reviews/StarRating";
import ServiceList from "../features/services/ServiceList";
import ReviewList from "../features/reviews/ReviewList";
import ReviewForm from "../features/reviews/ReviewForm";
import WorkerImageGallery from "../features/workers/WorkerImageGallery";
import '../css/pages/WorkerProfilePage.css';

const WorkerProfilePage = () => {
    const { userId } = useParams();
    const [requestLoading, setRequestLoading] = useState(false);
    const [reqBtnClicked, setReqBtnClicked] = useState(false);
    const worker = useSelector((state) => state.workers.workerProfile);
    const currentUser = useSelector(selectCurrentUser);
    const isLoading = useSelector((state) => state.workers.isLoading)
    let errMsg = useSelector((state) => state.workers.errMsg);
    let inContacts = null;
    let requestSent = useSelector(findRequestByToId(userId));
    if (currentUser) { 
        inContacts = currentUser.contacts.find(contact => contact._id === userId) 
    }
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchWorkerProfile(userId))
    },[])

    const requestContact = () => {
        if (currentUser) {
            setRequestLoading(true);
            setReqBtnClicked(true);
            const request = {
                from_id: currentUser._id,
                to_id: userId
            }
            dispatch(createRequest(request))
                .then(response => {
                    if (response.error) {
                        toast("Failed to Send Request: " + response.error.message);
                    } else {
                        toast("Contact Request Sent!");
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
            {worker.phone && (
                <Button>
                    <FontAwesomeIcon icon={faPhone} />
                </Button>)}
            {worker.email && (
                <Button>
                    <FontAwesomeIcon icon={faEnvelope} />
                </Button>)}
        </>)
        : requestSent || reqBtnClicked
        ? (<p className='request-sent'>request sent</p>)
        : (<Button onClick={requestContact}>Request Contact</Button>)
    }

    return isLoading ? (<div className='mt-3'><Loading /></div>) 
        : errMsg ? (<p>{errMsg}</p>) 
        : (<Container fluid className='p-3'>
            <Row className='profile-page-header'>
                <Col>
                    <div className='location'>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>{'... km away'}</p>
                    </div>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <RequestContactButton />
                </Col>
            </Row>
            <Row className='d-flex align-items-center'>
                <Col xs='3' lg='2'>
                    <div className='flex-shrink-0'>
                        <img 
                        src={worker.profile_pic} 
                        alt='profile picture'
                        className='img-fluid profile-pic-small'/>
                    </div>
                </Col>
                <Col className=''>
                        <h5 className='d-inline'>{worker.first_name} {worker.last_name}</h5>
                        <StarRating rating={worker.rating}/>
                        <p className='d-inline'>({worker.rating})</p>
                        <div className='location'>
                            <FontAwesomeIcon icon={faLocationDot} className='d-inline me-1'/>
                        {/* <p className='d-inline'>{worker.address}</p> */}
                    </div>
                    <ServiceList serviceIds={worker.services}/>
                </Col>
            </Row>
            <hr />
            <WorkerImageGallery />
            <hr />
            <h6 className='text-center' > Reviews for {worker.first_name} {worker.last_name}</h6>
            <hr />
            <ReviewList userId={userId}/>
            <div className='text-end my-4'>
                <ReviewForm userId={userId}/>
            </div>
        </Container>
    );
};

export default WorkerProfilePage;

// import { selectCurrentUser } from "../features/user/userSlice";
// import GetGeocode from "../utils/GetGeocode";
// import getDistance from "../utils/getDistance";

// useEffect(() => {
//     if (currentUser && currentUser.address && worker.address) {
//         GetGeocode(worker.address)
//             .then((coordinates) => {
//                 if (coordinates) {
//                     const { latitude:lat2, longitude:lng2 } = coordinates;
//                     const { latitude:lat1, longitude:lng1 } = currentUser.address;
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
// }, [currentUser])