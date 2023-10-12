import { Container, Row, Col, Button } from "reactstrap";
import { selectUserById,fetchUser } from "../features/users/usersSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import StarRating from "../features/reviews/StarRating";
import ServiceList from "../features/services/ServiceList";
import ReviewList from "../features/reviews/ReviewList";
import ReviewForm from "../features/reviews/ReviewForm";
import WorkerImageGallery from "../features/workers/WorkerImageGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { selectCurrentUser } from "../features/user/userSlice";
import GetGeocode from "../utils/GetGeocode";
import getDistance from "../utils/getDistance";
import { useDispatch } from "react-redux";


const WorkerProfilePage = () => {
    const { userId } = useParams();
    // const users = useSelector((state) => state.users);
    // const worker = useSelector(selectUserById(userId));
    const dispatch = useDispatch();
    const [distanceAway, setDistanceAway] = useState('...');
    const currentUser = useSelector(selectCurrentUser);
    // not sure what state variable to use for worker. Since its not advisable to
    // load all users only to get detail of one worker, Else like current user, we can set another state called selectedUser.
    const [worker, setWorker] = useState(''); 
    let isLoading = false;
    let errMsg = '';

    useEffect(()=>{
        isLoading = true;
        dispatch(fetchUser(userId))
        .then(response=>{
            setWorker(response.payload.profile);
            isLoading = false;
        })
    },[])


    useEffect(() => {
        if (currentUser && currentUser.address && worker.address) {
            GetGeocode(worker.address)
                .then((coordinates) => {
                    if (coordinates) {
                        const { latitude:lat2, longitude:lng2 } = coordinates;
                        const { latitude:lat1, longitude:lng1 } = currentUser.address;
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
    }, [currentUser])

    if (isLoading) {
        return (
            <Loading />
        )
    } 
    
    if (errMsg) {
        return (
            <div>
                ERROR
            </div>
        )
    }


    return (
        <Container fluid className='p-3'>
            <Row className='profile-page-header'>
                <Col>
                    <div className='location'>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>{`${distanceAway} km away`}</p>
                    </div>
                </Col>
                <Col>
                    <Button className=''>Request contact</Button>
                </Col>
            </Row>
            <Row className='d-flex align-items-center'>
                <Col xs='3' lg='2'>
                    <div class='flex-shrink-0'>
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
                        <p className='d-inline'>{worker.address}</p>
                    </div>
                    <ServiceList serviceIds={worker.services}/>
                </Col>
            </Row>
            <hr />
            <WorkerImageGallery />
            <hr />
            <h6 className='text-center' id='reviews'> Reviews for {worker.first_name} {worker.last_name}</h6>
            <hr />
            <ReviewList userId={userId}/>
            <div className='text-end my-4'>
                <ReviewForm userId={userId}/>
            </div>
        </Container>
    );
};

export default WorkerProfilePage;